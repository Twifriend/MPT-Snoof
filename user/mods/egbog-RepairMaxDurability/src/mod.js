"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const repair_1 = require("./repair");
const assort_1 = require("./assort");
const craft_1 = require("./craft");
const config_json_1 = require("../config/config.json");
class Mod {
    path;
    modLoader;
    preSptLoad(container) {
        const preSptModLoader = container.resolve("PreSptModLoader");
        const router = container.resolve("DynamicRouterModService");
        this.path = require("path");
        router.registerDynamicRouter("checkDragged", [
            {
                url: "/MaxDura/CheckDragged",
                action: async (url, info, sessionId, output) => {
                    const logger = container.resolve("WinstonLogger");
                    const jsonUtil = container.resolve("JsonUtil");
                    const profileHelper = container.resolve("ProfileHelper");
                    const pmcData = profileHelper.getPmcProfile(sessionId);
                    const repairInstance = new repair_1.Repair(logger, jsonUtil, pmcData, info);
                    return jsonUtil.serialize(repairInstance.ambeeb());
                }
            }
        ], "MaxDura");
    }
    postDBLoad(container) {
        const CustomItem = container.resolve("CustomItemService");
        const logger = container.resolve("WinstonLogger");
        const db = container.resolve("DatabaseService");
        const tables = db.getTables();
        const hashUtil = container.resolve("HashUtil");
        const MaxRepairKit = {
            itemTplToClone: "5910968f86f77425cf569c32", //5910968f86f77425cf569c32 weaprepairkit
            overrideProperties: {
                "Name": "Spare firearm parts",
                "ShortName": "Spare firearm parts",
                "Description": "Spare parts such as bolt carrier groups, firing pins and other common wear items. Enough to make approximately 5 repairs.",
                "Weight": 1,
                "MaxRepairResource": config_json_1.MaxRepairResource,
                "Height": 2,
                "Width": 2,
                "TargetItemFilter": [
                    "5422acb9af1c889c16000029"
                ]
            },
            parentId: "616eb7aea207f41933308f46",
            newId: "86afd148ac929e6eddc5e370",
            fleaPriceRoubles: config_json_1.Price,
            handbookPriceRoubles: config_json_1.Price,
            handbookParentId: "5b47574386f77428ca22b345",
            locales: {
                "en": {
                    name: "Spare firearm parts",
                    shortName: "Spare firearm parts",
                    description: "Spare parts such as bolt carrier groups, firing pins and other common wear items. Enough to make about 5 repairs."
                }
            }
        };
        CustomItem.createItemFromClone(MaxRepairKit);
        // trader assort
        const assortInstance = new assort_1.AssortInjector(logger, tables);
        const assortResult = assortInstance.addToAssort(config_json_1.Traders);
        if (assortResult.count > 0)
            for (let i of assortResult.traders)
                logger.debug(`[MaxDura]: Added trade to ${i.name}`);
        // hideout crafts
        const craftInstance = new craft_1.CraftInjector(logger, db);
        const injectedCount = craftInstance.injectCraft();
        if (injectedCount > 0)
            logger.debug(`[MaxDura]: (${injectedCount}) crafts injected into database`);
    }
    postSptLoad(container) {
        this.modLoader = container.resolve("PreSptModLoader");
    }
}
module.exports = { mod: new Mod() };
//# sourceMappingURL=mod.js.map