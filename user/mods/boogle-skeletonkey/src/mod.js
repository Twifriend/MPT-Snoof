"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mod = void 0;
const ItemTpl_1 = require("C:/snapshot/project/obj/models/enums/ItemTpl");
const skeletonKeyId = "673e1f10aaf0fe810c488218";
const keycardId = "673e213fc6be39d06423d6b7";
class Mod {
    config = require("../config/config.json");
    addToStaticLoot(container, containerId, itemId, relativeProbability) {
        const db = container.resolve("DatabaseServer");
        const locations = db.getTables().locations;
        for (const locationId in locations) {
            const location = locations[locationId];
            if (!location || !location.staticLoot) {
                continue;
            }
            const lootcontainer = location.staticLoot[containerId];
            if (lootcontainer) {
                lootcontainer.itemDistribution.push({ "tpl": itemId, "relativeProbability": relativeProbability });
            }
        }
    }
    addToBossLoot(container, itemId, relativeProbability, bannedBosses = []) {
        const db = container.resolve("DatabaseServer");
        const bosses = db.getTables().bots;
        for (const bossId in bosses.types) {
            if (bannedBosses.includes(bossId)) {
                continue;
            }
            const boss = bosses.types[bossId];
            if (!boss || !boss.inventory || !boss.inventory.items) {
                continue;
            }
            // boss.inventory.items.Backpack[itemId] = relativeProbability;
            boss.inventory.items.Pockets[itemId] = relativeProbability;
        }
    }
    postDBLoad(container) {
        const customItem = container.resolve("CustomItemService");
        const keyPrice = this.config.KeyPrice;
        const keycardPrice = this.config.KeycardPrice;
        const keyUses = this.config.KeyUses;
        const keycardUses = this.config.KeycardUses;
        const bannedBots = this.config.BannedBots;
        const botDropChance = this.config.BotDropChance;
        const containers = this.config.Containers;
        const skeletonKey = {
            itemTplToClone: ItemTpl_1.ItemTpl.KEY_DORM_ROOM_314_MARKED,
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
                    description: "Unlocks any door in the Tarkov region, incredibly rare and expensive."
                }
            }
        };
        const skeletonKeycard = {
            itemTplToClone: ItemTpl_1.ItemTpl.KEYCARD_TERRAGROUP_LABS_ACCESS,
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
                    description: "Unlocks any keycard door in the TerraGroup Laboratory and surrounding areas throughout the Tarkov region. Likely owned by a high-ranking TerraGroup employee."
                }
            }
        };
        customItem.createItemFromClone(skeletonKey);
        customItem.createItemFromClone(skeletonKeycard);
        for (const containerId in containers) {
            const dropchance = containers[containerId];
            this.addToStaticLoot(container, containerId, skeletonKeyId, dropchance); // Adds the Skeleton Key to jackets
        }
        this.addToBossLoot(container, skeletonKeyId, botDropChance, bannedBots); // Adds the Skeleton Key to bosses
        this.addToBossLoot(container, keycardId, botDropChance, bannedBots); // Adds the Skeleton Keycard to bosses
    }
    postSptLoad(container) {
        const db = container.resolve("DatabaseServer");
        const item = db.getTables().templates.items;
        const key = item[skeletonKeyId];
        const keycard = item[keycardId];
        if (key && keycard) {
            console.log("Skeleton Key and Skeleton Keycard loaded successfully.");
        }
    }
}
exports.mod = new Mod();
//# sourceMappingURL=mod.js.map