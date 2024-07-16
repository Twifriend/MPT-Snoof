"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CraftInjector = void 0;
const config_json_1 = require("../config/config.json");
class CraftInjector {
    logger;
    db;
    constructor(logger, db) {
        this.logger = logger;
        this.db = db;
    }
    createCraft(itemId, requirements, productionTime) {
        return {
            _id: `${itemId}_craft`,
            areaType: 10, //workbench
            requirements: requirements,
            productionTime: productionTime,
            endProduct: itemId,
            continuous: false,
            count: 1,
            productionLimitCount: 1,
            isEncoded: false,
            locked: false,
            needFuelForAllProductionTime: false,
        };
    }
    injectCraft() {
        let count = 0;
        const tables = this.db.getTables();
        let reqs = [];
        for (let a of config_json_1.Requirements)
            reqs.push(a);
        const itemId = "86afd148ac929e6eddc5e370";
        const productionItem = this.createCraft(itemId, reqs, config_json_1.CraftTime);
        tables.hideout.production.push(productionItem);
        return ++count;
    }
}
exports.CraftInjector = CraftInjector;
//# sourceMappingURL=craft.js.map