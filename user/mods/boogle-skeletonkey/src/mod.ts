import { DependencyContainer } from "tsyringe";

import { IPostDBLoadMod } from "@spt/models/external/IPostDBLoadMod";
import { CustomItemService } from "@spt/services/mod/CustomItemService";
import { NewItemFromCloneDetails } from "@spt/models/spt/mod/NewItemDetails";
import { IPostSptLoadMod } from "@spt/models/external/IPostSptLoadMod";
import { DatabaseServer } from "@spt/servers/DatabaseServer";
import { ILocation } from "@spt/models/eft/common/ILocation";
import { IBotType } from "@spt/models/eft/common/tables/IBotType";
import { ItemTpl } from "@spt/models/enums/ItemTpl";


const skeletonKeyId = "673e1f10aaf0fe810c488218"
const keycardId = "673e213fc6be39d06423d6b7"

class Mod implements IPostDBLoadMod, IPostSptLoadMod
{
    private config = require("../config/config.json")

    private addToStaticLoot(container: DependencyContainer, containerId: string, itemId: string, relativeProbability: number)
    {
        const db = container.resolve<DatabaseServer>("DatabaseServer");

        const locations = db.getTables().locations;

        for (const locationId in locations) 
        {
            const location: ILocation = locations[locationId];

            if (!location || !location.staticLoot) 
            {
                continue
            }

            const lootcontainer = location.staticLoot[containerId];

            if (lootcontainer) 
            {
                lootcontainer.itemDistribution.push({"tpl": itemId, "relativeProbability": relativeProbability});
            }
        }
    }

    private addToBossLoot(container: DependencyContainer, itemId: string, relativeProbability: number, bannedBosses: string[] = [])
    {
        const db = container.resolve<DatabaseServer>("DatabaseServer");

        const bosses = db.getTables().bots

        for (const bossId in bosses.types)
        {
            if (bannedBosses.includes(bossId)) 
            {
                continue
            }

            const boss: IBotType = bosses.types[bossId];

            if (!boss || !boss.inventory || !boss.inventory.items)
            {
                continue
            }

            // boss.inventory.items.Backpack[itemId] = relativeProbability;
            boss.inventory.items.Pockets[itemId] = relativeProbability;
        }
    }

    public postDBLoad(container: DependencyContainer): void
    {
        const customItem = container.resolve<CustomItemService>("CustomItemService");

        const keyPrice: number = this.config.KeyPrice;
        const keycardPrice: number = this.config.KeycardPrice;
        const keyUses: number = this.config.KeyUses;
        const keycardUses: number = this.config.KeycardUses;
        const bannedBots: string[] = this.config.BannedBots;
        const botDropChance: number = this.config.BotDropChance;
        const containers: Record<string, number> = this.config.Containers;

		

        const skeletonKey: NewItemFromCloneDetails = {
            itemTplToClone: ItemTpl.KEY_DORM_ROOM_314_MARKED,
            overrideProperties: {
                MaximumNumberOfUsage: keyUses,
                BackgroundColor: "yellow",
                Prefab: {
                    "path": "assets/content/items/spec/keys/item_key_11.bundle",
                    "rcid": ""
                }
            },
            parentId: "5c99f98d86f7745c314214b3",
            newId: skeletonKeyId,
            fleaPriceRoubles: keyPrice,
            handbookPriceRoubles: keyPrice,
            handbookParentId: "5c518ec986f7743b68682ce2",
            locales: {
                en: {
                    name: "Skeleton Key",
                    shortName: "Skeleton",
                    description: "A makeshift key that can be used to open any door in the Tarkov region. It can only be used once due to the fragile material it's made of."
                }
            }
        };

        const skeletonKeycard: NewItemFromCloneDetails = {
            itemTplToClone: ItemTpl.KEYCARD_TERRAGROUP_LABS_ACCESS,
            overrideProperties: {
                MaximumNumberOfUsage: keycardUses,
                BackgroundColor: "violet",
                Prefab: {
                    "path": "assets/content/items/spec/item_keycard_lab/item_keycard_lab_priority_serv.bundle",
                    "rcid": ""
                }
            },
            parentId: "5c164d2286f774194c5e69fa",
            newId: keycardId,
            fleaPriceRoubles: keycardPrice,
            handbookPriceRoubles: keycardPrice,
            handbookParentId: "5c518ed586f774119a772aee",
            locales: {
                en: {
                    name: "TerraGroup Labs priority access keycard",
                    shortName: "Priority",
                    description: "A forged keycard that unlocks any keycard door in the TerraGroup Laboratory and surrounding areas throughout the Tarkov region. The counterfeit nature of this card ensures that it can only bypass secured doors once."
                }
            }
        };

        customItem.createItemFromClone(skeletonKey);
        customItem.createItemFromClone(skeletonKeycard);

        for (const containerId in containers) 
        {
            const dropchance = containers[containerId];
            this.addToStaticLoot(container, containerId, skeletonKeyId, dropchance); // Adds the Skeleton Key to jackets
        }

        
        this.addToBossLoot(container, skeletonKeyId, botDropChance, bannedBots); // Adds the Skeleton Key to bosses
        this.addToBossLoot(container, keycardId, botDropChance, bannedBots); // Adds the Skeleton Keycard to bosses
    }

    public postSptLoad(container: DependencyContainer): void 
    {
        const db = container.resolve<DatabaseServer>("DatabaseServer");
        const item = db.getTables().templates.items;

        const key = item[skeletonKeyId];
        const keycard = item[keycardId];

        if (key && keycard) 
        {
            console.log("Skeleton Key and Skeleton Keycard loaded successfully.");
        }
    }
}

export const mod = new Mod();
