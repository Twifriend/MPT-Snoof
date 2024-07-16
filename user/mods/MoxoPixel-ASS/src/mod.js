"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ASS {
    postDBLoad(container) {
        // get database from server
        const databaseServer = container.resolve("DatabaseServer");
        // Get all the in-memory json found in /assets/database
        const tables = databaseServer.getTables();
        // S I C C organizational pouch
        const SICC = tables.templates.items["5d235bb686f77443f4331278"];
        // Access the specific path
        const filterArray = SICC["_props"]["Grids"][0]["_props"]["filters"][0]["Filter"];
        // Add item id's on new row
        const newValuesToAdd = [
            "573474f924597738002c6174",
            "5734758f24597738025ee253",
            "62a09cfe4f842e1bd12da3e4",
            "59faf7ca86f7740dbe19f6c2",
            "62a09cb7a04c0c5c6e0a84f8",
            "590c651286f7741e566b6461",
            "62a091170b9d3c46de5b6cf2",
            "5bc9bdb8d4351e003562b8a1",
            "590c645c86f77412b01304d9",
            "5c1265fc86f7743f896a21c2",
            "64f09c02b63b74469b6c149f",
            "6389c8fb46b54c634724d847",
            "590c37d286f77443be3d7827",
            "590c392f86f77444754deb29",
            "62a0a124de7ac81993580542",
            "5bc9b720d4351e450201234b",
            "61bf7c024770ee6f9c6b8b53",
            "5c12613b86f7743bbe2c3f76"
        ];
        filterArray.push(...newValuesToAdd);
    }
}
module.exports = { mod: new ASS() };
//# sourceMappingURL=mod.js.map