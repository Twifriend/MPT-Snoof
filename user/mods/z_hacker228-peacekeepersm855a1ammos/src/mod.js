"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const LogTextColor_1 = require("C:/snapshot/project/obj/models/spt/logging/LogTextColor");
const config = __importStar(require("../config.json"));
class ModLoader {
    container;
    postAkiLoad(container) {
        this.container = container;
        const logger = this.container.resolve("WinstonLogger");
        logger.info("Mod: Peacekeepers M855A1 ammos version: 1.0.2 loaded", LogTextColor_1.LogTextColor.YELLOW);
    }
    postDBLoad(container) {
        const logger = container.resolve("WinstonLogger");
        const dbServer = container.resolve("DatabaseServer");
        const dbTables = dbServer.getTables();
        const peacekeeper = dbTables.traders["5935c25fb3acc3127c3d8cd9"];
        const newAmmoItem = {
            "_id": "M855A1",
            "_tpl": "54527ac44bdc2d36668b4567",
            "parentId": "hideout",
            "slotId": "hideout",
            "upd": {
                "StackObjectsCount": 9999999,
                "BuyRestrictionMax": config.buy_restriction_max,
                "BuyRestrictionCurrent": 0
            }
        };
        peacekeeper.assort.items.push(newAmmoItem);
        peacekeeper.assort.barter_scheme["M855A1"] = [
            [
                {
                    "count": config.price,
                    "_tpl": "5696686a4bdc2da3298b456a"
                }
            ]
        ];
        peacekeeper.assort.loyal_level_items["M855A1"] = config.loyalty_level;
        logger.logWithColor("M855A1 ammo added to Peacekeeper.", LogTextColor_1.LogTextColor.GREEN);
    }
}
module.exports = { mod: new ModLoader() };
//# sourceMappingURL=mod.js.map