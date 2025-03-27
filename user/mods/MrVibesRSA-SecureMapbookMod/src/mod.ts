import { DependencyContainer } from "tsyringe";
import { IPostDBLoadMod, IPostSptLoadMod } from "@spt/models/external/IPostDBLoadMod";
import { CustomItemService } from "@spt/services/mod/CustomItemService";
import { NewItemFromCloneDetails } from "@spt/models/spt/mod/NewItemDetails";
import { DatabaseServer } from "@spt/servers/DatabaseServer";
import { ITemplateItem } from "@spt/models/eft/common/tables/ITemplateItem";
import { ModConfig } from "./types/IModConfig";

const config: ModConfig = require("../config/config.json");

// Constants
const HIDEOUT_PARENT_ID = "hideout";
const ROUBLES_TEMPLATE_ID = "5449016a4bdc2d6f028b456f";

class SecureMapbookMod implements IPostDBLoadMod, IPostSptLoadMod {
    private itemDB: Record<string, ITemplateItem>;

    public postDBLoad(container: DependencyContainer): void {
        const customItemService = container.resolve<CustomItemService>("CustomItemService");
        const databaseServer = container.resolve<DatabaseServer>("DatabaseServer");
        const tables = databaseServer.getTables();
        this.itemDB = tables.templates.items;

        if (config.enableDebugging) {
            console.log("[MrVibesRSA-SecureMapbookMod] Starting initialization...");
        }

        this.createMapbookItem(customItemService);
        this.addToTraderAssortment(tables);
        this.configureItemPermissions();
        this.disableMapsInsurance();

        if (config.enableDebugging) {
            console.log("[MrVibesRSA-SecureMapbookMod] Initialization complete");
        }
    }

    private createMapbookItem(customItemService: CustomItemService): void {
        const mapbookDetails: NewItemFromCloneDetails = {
            itemTplToClone: "5a9d6d00a2750c5c985b5305",
            overrideProperties: this.getMapbookProperties(),
            parentId: "55818b224bdc2dde698b456f",
            newId: config.mapbookItemId,
            fleaPriceRoubles: config.price,
            handbookPriceRoubles: config.price,
            handbookParentId: "5b47574386f77428ca22b2f1",
            locales: this.getMapbookLocales()
        };

        customItemService.createItemFromClone(mapbookDetails);

        if (config.enableDebugging) {
            console.log(`[MrVibesRSA-SecureMapbookMod] Created item with ID: ${config.mapbookItemId}`);
        }
    }

    private getMapbookProperties(): any {
        return {
            Name: "Secure Mapbook",
            ShortName: "Mapbook",
            Description: "A meticulously crafted book designed for storing and organizing maps...",
            Prefab: {
                path: "assets/content/items/barter/item_mapbook/mapbook.bundle",
                rcid: ""
            },
            Width: 1,
            Height: 2,
            isContainer: false,
            CanPutIntoDuringTheRaid: true,
            RaidModdable: true,
            InsuranceDisabled: !config.allowInsurance,
            CanSellOnRagfair: false,
            ItemSound: "item_book",
            Grids: [],
            Slots: this.generateMapSlots()
        };
    }

    private generateMapSlots(): any[] {
        const slots = [];
        const mapEntries = Object.entries(config.maps);

        for (let i = 0; i < mapEntries.length; i++) {
            const [mapName, mapId] = mapEntries[i];
            slots.push({
                _name: `mod_mount_${(i + 1).toString().padStart(2, '0')}`,
                _id: `5d235bb686f77443f433127${String.fromCharCode(98 + i)}`, // b-m
                _parent: "55818b224bdc2dde698b456f",
                _props: {
                    filters: [{
                        Filter: [mapId],
                        ExcludedFilter: []
                    }]
                }
            });

            if (config.enableDebugging) {
                console.log(`[MrVibesRSA-SecureMapbookMod] Added slot for ${mapName} (${mapId})`);
            }
        }

        return slots;
    }

    private getMapbookLocales(): Record<string, { name: string; shortName: string; description: string }> {
        return {
            en: {
                name: "Secure Mapbook",
                shortName: "Mapbook",
                description: "A meticulously crafted book designed for storing and organizing maps..."
            }
        };
    }

    private addToTraderAssortment(tables: any): void {
        const trader = tables.traders[config.traderId];

        trader.assort.items.push({
            _id: config.mapbookItemId,
            _tpl: config.mapbookItemId,
            parentId: HIDEOUT_PARENT_ID,
            slotId: HIDEOUT_PARENT_ID,
            upd: {
                UnlimitedCount: true,
                StackObjectsCount: 99999
            }
        });

        trader.assort.barter_scheme[config.mapbookItemId] = [
            [{
                count: config.price,
                _tpl: ROUBLES_TEMPLATE_ID
            }]
        ];

        trader.assort.loyal_level_items[config.mapbookItemId] = config.loyaltyLevel;

        if (config.enableDebugging) {
            console.log(`[MrVibesRSA-SecureMapbookMod] Added to trader ${config.traderId} for ${config.price} roubles (LL${config.loyaltyLevel})`);
        }
    }

    private configureItemPermissions(): void {
        if (config.allowInSpecialSlots) {
            this.allowInSpecialSlots();
        }

        if (config.allowInSecureContainers) {
            this.allowInSecureContainers();
        }
    }

    private allowInSpecialSlots(): void {
        if (!config.specialSlotsList || config.specialSlotsList.length === 0) {
            console.error("[MrVibesRSA-SecureMapbookMod] No special slots configured!");
            return;
        }

        const itemsToAdd = [config.mapbookItemId, ...Object.values(config.maps)];

        config.specialSlotsList.forEach(slotId => {
            if (!this.itemDB[slotId]) {
                console.error(`[MrVibesRSA-SecureMapbookMod] Special slot container not found: ${slotId}`);
                return;
            }

            const container = this.itemDB[slotId];

            try {
                // Process all slots in the container
                container._props.Slots?.forEach((slot: any, index: number) => {
                    if (!slot._props.filters[0].Filter) {
                        slot._props.filters[0].Filter = [];
                    }

                    itemsToAdd.forEach(itemId => {
                        if (!slot._props.filters[0].Filter.includes(itemId)) {
                            slot._props.filters[0].Filter.push(itemId);

                            if (config.enableDebugging) {
                                console.log(`[MrVibesRSA-SecureMapbookMod] Added ${itemId} to ${slotId} slot ${index}`);
                            }
                        }
                    });
                });

                if (config.enableDebugging) {
                    console.log(`[MrVibesRSA-SecureMapbookMod] Updated ${slotId} successfully`);
                }
            } catch (error) {
                console.error(`[MrVibesRSA-SecureMapbookMod] Failed to modify ${slotId}:`, error);
            }
        });
    }

    private allowInSecureContainers(): void {
        // Get all container IDs from config
        const containerIds = [
            ...Object.values(config.secureContainers),
            config.organizationalPouch.SICC_organizational_pouch
        ];

        containerIds.forEach(containerId => {
            try {
                const container = this.itemDB[containerId];
                const filters = container._props.Grids[0]._props.filters;

                if (filters[0]?.Filter) {
                    filters[0].Filter.push(config.mapbookItemId);
                } else {
                    filters.push({ Filter: [config.mapbookItemId] });
                }

                if (config.enableDebugging) {
                    console.log(`[MrVibesRSA-SecureMapbookMod] Added to container ${containerId}`);
                }
            } catch (error) {
                console.error(`[MrVibesRSA-SecureMapbookMod] Failed to modify container ${containerId}:`, error);
            }
        });
    }

    private disableMapsInsurance(): void {
        Object.values(config.maps).forEach(mapId => {
            if (this.itemDB[mapId]) {
                this.itemDB[mapId]._props.InsuranceDisabled = true;

                if (config.enableDebugging) {
                    console.log(`[MrVibesRSA-SecureMapbookMod] Disabled insurance for map: ${mapId}`);
                }
            } else if (config.enableDebugging) {
                console.warn(`[MrVibesRSA-SecureMapbookMod] Map not found in DB: ${mapId}`);
            }
        });
    }

    public postSptLoad(container: DependencyContainer): void {
        const db = container.resolve<DatabaseServer>("DatabaseServer");
        const items = db.getTables().templates.items;

        // Verify mapbook
        const mapbook = items[config.mapbookItemId];
        const mapbookStatus = mapbook?._props
            ? "Mapbook has loaded successfully"
            : "Mapbook failed to load";

        console.log(`[MrVibesRSA-SecureMapbookMod] ${mapbookStatus}`);

        // Verify maps insurance
        if (config.enableDebugging) {
            Object.entries(config.maps).forEach(([mapName, mapId]) => {
                const mapItem = items[mapId];
                if (mapItem) {
                    const insuranceStatus = mapItem._props.InsuranceDisabled
                        ? "Insurance disabled"
                        : "Insurance still enabled";
                    console.log(`[MrVibesRSA-SecureMapbookMod] ${mapName.padEnd(12)} ${insuranceStatus}`);
                } else {
                    console.warn(`[MrVibesRSA-SecureMapbookMod] Map not found: ${mapName} (${mapId})`);
                }
            });
        }
    }
}

export const mod = new SecureMapbookMod();