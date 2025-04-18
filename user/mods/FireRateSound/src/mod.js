"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FireRateService_1 = require("./Service/FireRateService");
class FireRateSound {
    /**
     * Initializes the module and registers the dependency container.
     * @param container The instance of the dependency container.
     */
    postDBLoad(container) {
        const dataService = container.resolve("DatabaseService");
        const logger = container.resolve("WinstonLogger");
        const itemHelper = container.resolve("ItemHelper");
        const firerateService = new FireRateService_1.FireRateService(logger, dataService, itemHelper);
        firerateService.fireRateChange();
    }
}
module.exports = { mod: new FireRateSound() };
//# sourceMappingURL=mod.js.map