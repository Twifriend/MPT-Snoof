"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Mod {
    container = null;
    inventoryHelper = null;
    itemHelper = null;
    profileHelper = null;
    saveServer = null;
    logger = null;
    hashUtil = null;
    preAkiLoad(container) {
        this.logger = container.resolve("WinstonLogger");
        const staticRouterModService = container.resolve("StaticRouterModService");
        this.container = container;
        this.profileHelper =
            this.container.resolve("ProfileHelper");
        this.inventoryHelper =
            this.container.resolve("InventoryHelper");
        this.hashUtil = container.resolve("HashUtil");
        this.saveServer = container.resolve("SaveServer");
        this.itemHelper = container.resolve("ItemHelper");
        // Hook up a new static route
        staticRouterModService.registerStaticRouter("LoadoutSpawnWeapon", [
            {
                url: "/loadout-spawner/weapon",
                action: (url, info, sessionId) => {
                    return this.giveItem(sessionId, info.items);
                },
            },
        ], "LoadoutSpawnWeapon");
    }
    giveItem(sessionId, weapon) {
        const pmcData = this.profileHelper.getPmcProfile(sessionId);
        const output = {
            warnings: [],
            profileChanges: {
                [sessionId]: {
                    items: {
                        new: [],
                        change: [],
                        del: [],
                    },
                },
            },
        };
        this.inventoryHelper.addItemToStash(sessionId, {
            itemWithModsToAdd: this.itemHelper.replaceIDs(weapon, pmcData),
            foundInRaid: true,
            useSortingTable: false,
            callback: null,
        }, pmcData, output);
        this.saveServer.saveProfile(sessionId);
        this.logger.info(JSON.stringify(output.profileChanges, null, 2));
        return JSON.stringify(output.profileChanges[sessionId]);
    }
}
module.exports = { mod: new Mod() };
//# sourceMappingURL=mod.js.map