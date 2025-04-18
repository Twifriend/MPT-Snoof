"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WeaponAudioData = void 0;
class WeaponAudioData {
    id;
    name;
    shortName;
    fireRateMod;
    fireRate;
    hasFullAuto;
    mod;
    constructor(data) {
        this.id = data.id ?? "";
        this.name = data.name ?? "";
        this.shortName = data.shortName ?? "";
        this.fireRateMod = data.fireRateMod ?? 0;
        this.fireRate = data.fireRate ?? 0;
        this.hasFullAuto = data.hasFullAuto ?? false;
        this.mod = data.mod ?? false;
    }
    toJson() {
        return {
            id: this.id,
            name: this.name,
            shortName: this.shortName,
            fireRateMod: this.fireRateMod,
            fireRate: this.fireRate,
            hasFullAuto: this.hasFullAuto,
            mod: this.mod
        };
    }
}
exports.WeaponAudioData = WeaponAudioData;
//# sourceMappingURL=IWeaponAudioData.js.map