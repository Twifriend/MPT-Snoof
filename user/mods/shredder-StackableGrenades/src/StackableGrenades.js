"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
class StackableGrenades {
    postDBLoad(container) {
        const logger = container.resolve("WinstonLogger");
        const db = container.resolve("DatabaseServer").getTables().templates.items;
        this.pkg = require("../package.json");
        const config = require("./config.json");

        logger.log(`[${this.pkg.name}] Loaded v${this.pkg.version} for AKI v${this.pkg.akiVersion}! Made by ${this.pkg.author}.`, "cyan");

        let grandes = [
            // 40x46mm
            "5ede474b0c226a66f5402622", // M381
            "5ede475b549eed7c6d5c18fb", // M386
            "5ede4739e0350d05467f73e8", // M406 - 
            "5f0c892565703e5c461894e9", // M433 - 
            "5ede47405b097655935d7d16", // M441 - 
            "5ede475339ee016e8c534742", // M576 - 

            // 40x53mm
            "5656eb674bdc2d35148b457c",

            // Throwables
            //"5a0c27731526d80618476ac4", // Zarya
            //"5710c24ad2720bc3458b45a3", // F-1
            //"617aa4dd8166f034d57de9c5", // M-18
            //"58d3db5386f77426186285a0", // M67
            //"619256e5f8af2c1a4e1f5d92", // M7290
            //"5a2a57cfc4a2826c6e06d44a", // RDG-2B
            //"5448be9a4bdc2dfd2f8b456a", // RGD-5
            //"617fd91e5539a84ec44ce155", // RGN
            //"618a431df1eb8e24b8741deb", // RGO
            //"5e32f56fcb6d5863cc5e5ee4", // VOG-17
            //"5e340dcdcb6d5863cc5e5efb" // VOG-25
        ];

        for (let item in db) {
            let grenadeItem = db[item];
            if (grandes.includes(grenadeItem._id)) {
                grenadeItem._props.StackMaxSize = config.StackSize;
                logger.log(`[${this.pkg.name}] ${grenadeItem._id} (${grenadeItem._props.Name}) stack size set to ${config.StackSize}.`, "cyan");
            }
        }

    }
}

module.exports = {
    mod: new StackableGrenades()
};