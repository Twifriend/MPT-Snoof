"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BotNames {
    bearCFG = require("../cfg/bear.json");
    usecCFG = require("../cfg/usec.json");
    postDBLoad(container) {
        // Get the logger from the server container.
        const logger = container.resolve("WinstonLogger");
        // Get database from server.
        const db = container.resolve("DatabaseServer");
        const bot = db.getTables().bots.types;
        const bearNames = this.bearCFG['Names'];
        const usecNames = this.usecCFG['Names'];
        bot["bear"].firstName = bearNames;
        bot["usec"].firstName = usecNames;
        logger.info("Bots names loaded!");
    }
}
module.exports = { mod: new BotNames() };
//# sourceMappingURL=mod.js.map