import { DependencyContainer } from "tsyringe";
import { Ilogger } from "@spt-aki/models/spt/utils/Ilogger";
import { IPostDBLoadMod } from "@spt-aki/models/external/IPostDBLoadMod";
import { DatabaseServer } from "@spt-aki/servers/DatabaseServer";

class BotNames implements IPostDBLoadMod
{

    private bearCFG = require("../cfg/bear.json");
    private usecCFG = require("../cfg/usec.json");


    public postDBLoad(container: DependencyContainer): void 
    {
        // Get the logger from the server container.
        const logger = container.resolve<Ilogger>("WinstonLogger");
        // Get database from server.
        const db = container.resolve<DatabaseServer>("DatabaseServer");      

        const bot = db.getTables().bots.types;
        const bearNames = this.bearCFG['Names'];
       const usecNames = this.usecCFG['Names'];


        bot["bear"].firstName = bearNames
      

        bot["usec"].firstName = usecNames

        logger.info("Bots names loaded!");

    }
}

module.exports = { mod: new BotNames() }