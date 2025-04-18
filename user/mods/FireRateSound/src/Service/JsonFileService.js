"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonFileService = void 0;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const config_1 = require("../config");
class JsonFileService {
    jsonWeaponFolderPath;
    logger;
    constructor(logger) {
        this.jsonWeaponFolderPath = config_1.config.jsonWeaponFolderPath;
        this.logger = logger;
    }
    /**
     * Checks if the directory exists.
     * @returns `true` if the folder exists, `false` otherwise.
     */
    doesFolderExist(folderPath) {
        if (!fs.existsSync(folderPath)) {
            this.logger.debug(`[FireRateSound] [JsonFileService] Folder not found: ${folderPath}`);
            return false;
        }
        return true;
    }
    getWeaponFolderPath() {
        return this.jsonWeaponFolderPath;
    }
    loadJsonFiles() {
        if (!fs.existsSync(this.jsonWeaponFolderPath)) {
            this.logger.debug(`[FireRateSound] [JsonFileService] Folder not found: ${this.jsonWeaponFolderPath}`);
            return [];
        }
        try {
            const files = fs.readdirSync(this.jsonWeaponFolderPath);
            const jsonFiles = files.filter(file => file.includes("fireRates.json"));
            return jsonFiles.map(file => {
                const filePath = path.join(this.jsonWeaponFolderPath, file);
                const rawData = fs.readFileSync(filePath, "utf-8");
                return { fileName: file, json: JSON.parse(rawData) };
            });
        }
        catch (error) {
            this.logger.debug(`[FireRateSound] Error reading directory: ${error.message}`);
            return [];
        }
    }
    /**
     * Write fire rate diff results to firerate.json
     * @param json - The object to write
     * @param fileName - name file
     */
    writeModifiedFireRateJson(fileName, json) {
        const fullPath = path.join(this.jsonWeaponFolderPath, fileName);
        try {
            fs.writeFileSync(fullPath, JSON.stringify(json, null, 2), "utf-8");
            this.logger.debug(`[FireRateSound] Fire rate modification saved to ${fileName}`);
        }
        catch (error) {
            this.logger.debug(`[FireRateSound] Failed to write ${fileName}: ${error.message}`);
        }
    }
}
exports.JsonFileService = JsonFileService;
//# sourceMappingURL=JsonFileService.js.map