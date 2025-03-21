"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mod = void 0;
const Traders_1 = require("C:/snapshot/project/obj/models/enums/Traders");
const InstanceManager_1 = require("./InstanceManager");
class DynamicMaps {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    InstanceManager = new InstanceManager_1.InstanceManager();
    preSptLoad(container) {
        this.InstanceManager.preSptLoad(container);
    }
    postDBLoad(container) {
        this.InstanceManager.postDBLoad(container);
        this.createNewMaps();
    }
    createNewMaps() {
        this.createGroundZeroMap();
        this.createStreetsMap();
        this.createReserveMap();
        this.createLabsMap();
        this.createLighthouseMap();
    }
    createGroundZeroMap() {
        const gzMap = {
            itemTplToClone: "5900b89686f7744e704a8747",
            parentId: "567849dd4bdc2d150f8b456e",
            newId: "6738033eb7305d3bdafe9518",
            fleaPriceRoubles: 25000,
            handbookPriceRoubles: 32500,
            handbookParentId: "5b47574386f77428ca22b343",
            overrideProperties: {},
            locales: {
                en: {
                    name: "Ground Zero plan map",
                    shortName: "Ground Zero",
                    description: ""
                }
            }
        };
        const assortId = "6738076415fd9232e8dae982";
        this.InstanceManager.customItemService.createItemFromClone(gzMap);
        this.pushToTraderAssort(Traders_1.Traders.THERAPIST, gzMap.newId, gzMap.handbookPriceRoubles, assortId);
    }
    createStreetsMap() {
        const streetsMap = {
            itemTplToClone: "5900b89686f7744e704a8747",
            parentId: "567849dd4bdc2d150f8b456e",
            newId: "673803448cb3819668d77b1b",
            fleaPriceRoubles: 25000,
            handbookPriceRoubles: 32500,
            handbookParentId: "5b47574386f77428ca22b343",
            overrideProperties: {},
            locales: {
                en: {
                    name: "Streets of Tarkov plan",
                    shortName: "Streets",
                    description: ""
                }
            }
        };
        const assortId = "67380769ebda082cf01c3fd7";
        this.InstanceManager.customItemService.createItemFromClone(streetsMap);
        this.pushToTraderAssort(Traders_1.Traders.THERAPIST, streetsMap.newId, streetsMap.handbookPriceRoubles, assortId);
    }
    createReserveMap() {
        const reserveMap = {
            itemTplToClone: "5900b89686f7744e704a8747",
            parentId: "567849dd4bdc2d150f8b456e",
            newId: "6738034a9713b5f42b4a8b78",
            fleaPriceRoubles: 25000,
            handbookPriceRoubles: 32500,
            handbookParentId: "5b47574386f77428ca22b343",
            overrideProperties: {},
            locales: {
                en: {
                    name: "Reserve plan",
                    shortName: "Reserve",
                    description: ""
                }
            }
        };
        const assortId = "6738076e704fef20a1a580e6";
        this.InstanceManager.customItemService.createItemFromClone(reserveMap);
        this.pushToTraderAssort(Traders_1.Traders.THERAPIST, reserveMap.newId, reserveMap.handbookPriceRoubles, assortId);
    }
    createLabsMap() {
        const labsMap = {
            itemTplToClone: "5900b89686f7744e704a8747",
            parentId: "567849dd4bdc2d150f8b456e",
            newId: "6738034e9d22459ad7cd1b81",
            fleaPriceRoubles: 25000,
            handbookPriceRoubles: 32500,
            handbookParentId: "5b47574386f77428ca22b343",
            overrideProperties: {},
            locales: {
                en: {
                    name: "Labs plan",
                    shortName: "Labs",
                    description: ""
                }
            }
        };
        const assortId = "673807742ef49729b9dd1b0a";
        this.InstanceManager.customItemService.createItemFromClone(labsMap);
        this.pushToTraderAssort(Traders_1.Traders.THERAPIST, labsMap.newId, labsMap.handbookPriceRoubles, assortId);
    }
    createLighthouseMap() {
        const lighthouseMap = {
            itemTplToClone: "5900b89686f7744e704a8747",
            parentId: "567849dd4bdc2d150f8b456e",
            newId: "6738035350b24a4ae4a57997",
            fleaPriceRoubles: 25000,
            handbookPriceRoubles: 32500,
            handbookParentId: "5b47574386f77428ca22b343",
            overrideProperties: {},
            locales: {
                en: {
                    name: "Lighthouse plan",
                    shortName: "Lighthouse",
                    description: ""
                }
            }
        };
        const assortId = "6738077be5a03fda63c9917d";
        this.InstanceManager.customItemService.createItemFromClone(lighthouseMap);
        this.pushToTraderAssort(Traders_1.Traders.THERAPIST, lighthouseMap.newId, lighthouseMap.handbookPriceRoubles, assortId);
    }
    pushToTraderAssort(traderId, itemId, price, assortId) {
        const assort = this.InstanceManager.database.traders[traderId].assort;
        const item = {
            _id: assortId,
            _tpl: itemId,
            parentId: "hideout",
            slotId: "hideout",
            upd: {
                UnlimitedCount: false,
                StackObjectsCount: 4,
                BuyRestrictionMax: 10,
                BuyRestrictionCurrent: 0
            }
        };
        const scheme = [
            [
                {
                    count: price,
                    _tpl: "5449016a4bdc2d6f028b456f"
                }
            ]
        ];
        assort.items.push(item);
        assort.barter_scheme[assortId] = scheme;
        assort.loyal_level_items[assortId] = 1;
    }
}
exports.mod = new DynamicMaps();
//# sourceMappingURL=mod.js.map