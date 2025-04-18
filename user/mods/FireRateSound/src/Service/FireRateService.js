"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FireRateService = void 0;
const JsonFileService_1 = require("./JsonFileService");
const IWeaponAudioData_1 = require("../Entity/IWeaponAudioData");
const WEAPON = "5422acb9af1c889c16000029";
class FireRateService {
    logger;
    itemHelper;
    dataService;
    jsonFileService;
    constructor(logger, dataService, itemHelper) {
        this.logger = logger;
        this.itemHelper = itemHelper;
        this.dataService = dataService;
        this.jsonFileService = new JsonFileService_1.JsonFileService(logger);
    }
    fireRateChange() {
        const templates = this.dataService.getTemplates();
        const items = templates?.items;
        if (!templates || !items) {
            this.logger.debug("[FireRateSound] Invalid dataService structure. Modification aborted");
            return;
        }
        const jsonData = this.jsonFileService.loadJsonFiles();
        this.resetModFlags(jsonData);
        const weaponsSPT = Object.values(items).filter(item => item?._id && this.itemHelper.isOfBaseclass(item._id, WEAPON));
        this.applyModification(jsonData, weaponsSPT);
    }
    applyModification(jsonData, weaponsSPT) {
        for (const { fileName, json } of jsonData) {
            if (!json || typeof json !== "object") {
                this.logger.debug(`[FireRateSound] Invalid or missing JSON data in ${fileName}`);
                continue;
            }
            let modified = false;
            for (const id of Object.keys(json)) {
                const weaponJson = new IWeaponAudioData_1.WeaponAudioData(json[id]);
                const weaponSPT = weaponsSPT.find(w => w._id === id);
                if (!weaponSPT) {
                    this.logger.debug(`[FireRateSound] ❌ Weapon not found in SPT: ID ${id}, name: ${weaponJson.shortName}`);
                    continue;
                }
                if (!weaponSPT._props || typeof weaponSPT._props.bFirerate !== "number") {
                    this.logger.debug(`[FireRateSound] ❌ Weapon has no valid bFirerate: ID ${id}, name: ${weaponJson.shortName}`);
                    continue;
                }
                const currentRate = weaponSPT._props.bFirerate;
                const jsonRateMod = weaponJson.fireRateMod;
                // 🔍 mod = true if change
                if (currentRate !== jsonRateMod) {
                    this.logger.debug(`[FireRateSound] FireRate mismatch for ${weaponJson.shortName} (${id}): SPT = ${currentRate}, JSON = ${jsonRateMod}`);
                    weaponSPT._props.bFirerate = jsonRateMod;
                    json[id]["mod"] = true;
                    modified = true;
                }
            }
            if (modified) {
                this.logger.debug(`[FireRateSound] ✍️ Writing modified fireRate flags to ${fileName}`);
                this.jsonFileService.writeModifiedFireRateJson(fileName, json);
            }
        }
    }
    resetModFlags(jsonData) {
        for (const { fileName, json } of jsonData) {
            if (!json || typeof json !== "object") {
                this.logger.debug(`[FireRateSound] JSON invalide : ${fileName}`);
                continue;
            }
            for (const id of Object.keys(json)) {
                if (json[id].mod === true) {
                    json[id].mod = false;
                }
            }
            this.jsonFileService.writeModifiedFireRateJson(fileName, json);
        }
    }
}
exports.FireRateService = FireRateService;
//# sourceMappingURL=FireRateService.js.map