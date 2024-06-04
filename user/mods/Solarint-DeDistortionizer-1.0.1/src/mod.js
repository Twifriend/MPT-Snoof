"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class distortion {
    postDBLoad(container) {
        // get database from server
        const databaseServer = container.resolve("DatabaseServer");
        // Get all the in-memory json found in /assets/database
        const tables = databaseServer.getTables();
        // Find the ledx item by its Id
        const comtac2 = tables.templates.items["5645bcc04bdc2d363b8b4572"];
        const sordin = tables.templates.items["5aa2ba71e5b5b000137b758f"];
        const comtac4 = tables.templates.items["628e4e576d783146b124c64d"];
        const m32 = tables.templates.items["6033fa48ffd42c541047f728"];
        const sport = tables.templates.items["5c165d832e2216398b5a7e36"];
        const razor = tables.templates.items["5e4d34ca86f774264f758330"];
        const xcel = tables.templates.items["5f60cd6cf2bcbb675b00dac6"];
        const rac = tables.templates.items["5a16b9fffcdbcb0176308b34"];
        const gssh = tables.templates.items["5b432b965acfc47a8774094e"];
        // Update one of its properties to be true
        comtac2._props.Distortion = 0.01;
        sordin._props.Distortion = 0.01;
        comtac4._props.Distortion = 0.01;
        m32._props.Distortion = 0.01;
        sport._props.Distortion = 0.01;
        razor._props.Distortion = 0.01;
        xcel._props.Distortion = 0.01;
        rac._props.Distortion = 0.01;
        gssh._props.Distortion = 0.01;
    }
}
module.exports = { mod: new distortion() };
//# sourceMappingURL=mod.js.map