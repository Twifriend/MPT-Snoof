"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ConfigTypes_1 = require("C:/snapshot/project/obj/models/enums/ConfigTypes");
const config_json_1 = __importDefault(require("../config.json"));
class MultiplyALL {
    tables;
    questConfig;
    coreConfig;
    lootConfig;
    raidConfig;
    hideoutConfig;
    configServer;
    logger;
    postDBLoad(container) {
        this.logger = container.resolve("WinstonLogger");
        this.configServer = container.resolve("ConfigServer");
        this.questConfig = this.configServer.getConfig(ConfigTypes_1.ConfigTypes.QUEST);
        this.coreConfig = this.configServer.getConfig(ConfigTypes_1.ConfigTypes.CORE);
        this.lootConfig = this.configServer.getConfig(ConfigTypes_1.ConfigTypes.LOCATION);
        this.raidConfig = this.configServer.getConfig(ConfigTypes_1.ConfigTypes.IN_RAID);
        this.hideoutConfig = this.configServer.getConfig(ConfigTypes_1.ConfigTypes.HIDEOUT);
        this.tables = container.resolve("DatabaseServer").getTables();
        this.multiplyDailiesAndWeeklies();
        this.multiplyQuests();
        this.multiplyItemValues();
        this.multiplyRaidExitExperience();
        this.multiplySkillProgressionRate();
        this.multiplyWeaponSkillProgressionRate();
        this.multiplyLoots();
        this.multiplyFleaOfferCount();
        this.multiplyFenceReputation();
        this.multiplyStamina();
        this.multiplyMagazineSpeeds();
        this.multiplyHideout();
        this.multiplyKills();
    }
    multiplyHideout() {
        if (config_json_1.default.hideout.stashMultiplier !== 1) {
            // 566abbc34bdc2d92178b4576 Standard stash 10x28
            // 5811ce572459770cba1a34ea Left Behind stash 10x38
            // 5811ce662459770f6f490f32 Prepare for escape stash 10x48
            // 5811ce772459770e9e5f9532 Edge of darkness stash 10x68
            try {
                this.tables.templates.items["566abbc34bdc2d92178b4576"]._props.Grids[0]._props.cellsV = Math.round(this.tables.templates.items["566abbc34bdc2d92178b4576"]._props.Grids[0]._props.cellsV * config_json_1.default.hideout.stashMultiplier);
                this.tables.templates.items["5811ce572459770cba1a34ea"]._props.Grids[0]._props.cellsV = Math.round(this.tables.templates.items["5811ce572459770cba1a34ea"]._props.Grids[0]._props.cellsV * config_json_1.default.hideout.stashMultiplier);
                this.tables.templates.items["5811ce662459770f6f490f32"]._props.Grids[0]._props.cellsV = Math.round(this.tables.templates.items["5811ce662459770f6f490f32"]._props.Grids[0]._props.cellsV * config_json_1.default.hideout.stashMultiplier);
                this.tables.templates.items["5811ce772459770e9e5f9532"]._props.Grids[0]._props.cellsV = Math.round(this.tables.templates.items["5811ce772459770e9e5f9532"]._props.Grids[0]._props.cellsV * config_json_1.default.hideout.stashMultiplier);
                this.logger.info(`[MultiplyALL-HIDEOUT]: Stash size multiplied by ${config_json_1.default.hideout.stashMultiplier}, New sizes: Standard stash(10x${this.tables.templates.items["566abbc34bdc2d92178b4576"]._props.Grids[0]._props.cellsV}) Left Behind stash(10x${this.tables.templates.items["5811ce572459770cba1a34ea"]._props.Grids[0]._props.cellsV}) Prepare for escape stash(10x${this.tables.templates.items["5811ce662459770f6f490f32"]._props.Grids[0]._props.cellsV}) Edge of darkness stash(10x${this.tables.templates.items["5811ce772459770e9e5f9532"]._props.Grids[0]._props.cellsV})`);
            }
            catch (error) {
                this.logger.error(`[MultiplyALL-HIDEOUT]: Error occurred while multiplying stash, Error: ${error}`);
            }
        }
        if (config_json_1.default.hideout.productionSpeedMultiplier !== 1) {
            for (let i = 0; i < this.tables.hideout.production.length; i += 1) {
                this.tables.hideout.production[i].productionTime = Math.round(this.tables.hideout.production[i].productionTime / config_json_1.default.hideout.productionSpeedMultiplier);
            }
            this.logger.info(`[MultiplyALL-HIDEOUT]: Production speed multiplied by ${config_json_1.default.hideout.productionSpeedMultiplier}`);
        }
        if (config_json_1.default.hideout.fuelUsageMultiplier !== 1) {
            this.tables.hideout.settings.generatorFuelFlowRate = this.tables.hideout.settings.generatorFuelFlowRate * config_json_1.default.hideout.fuelUsageMultiplier;
            this.logger.info(`[MultiplyALL-HIDEOUT]: Fuel flow rate multiplied by ${config_json_1.default.hideout.fuelUsageMultiplier}`);
        }
    }
    multiplyMagazineSpeeds() {
        if (config_json_1.default.ammo.magazineLoadSpeedMultiplier !== 1) {
            this.tables.globals.config.BaseLoadTime /= config_json_1.default.ammo.magazineLoadSpeedMultiplier;
            this.logger.info(`[MultiplyALL-AMMO]: Magazine load time multiplied by: ${config_json_1.default.ammo.magazineLoadSpeedMultiplier}`);
        }
        if (config_json_1.default.ammo.magazineUnloadSpeedMultiplier !== 1) {
            this.tables.globals.config.BaseUnloadTime /= config_json_1.default.ammo.magazineUnloadSpeedMultiplier;
            this.logger.info(`[MultiplyALL-AMMO]: Magazine unload time multiplied by: ${config_json_1.default.ammo.magazineUnloadSpeedMultiplier}`);
        }
    }
    multiplyStamina() {
        if (config_json_1.default.stamina.capacityMultiplier !== 1) {
            this.tables.globals.config.Stamina.Capacity = Math.round(this.tables.globals.config.Stamina.Capacity * config_json_1.default.stamina.capacityMultiplier);
            this.logger.info(`[MultiplyALL-STAMINA]: Capacity multiplied by: ${config_json_1.default.stamina.capacityMultiplier} | New Capacity: ${this.tables.globals.config.Stamina.Capacity}`);
        }
    }
    multiplyFenceReputation() {
        if (config_json_1.default.reputation.carExtractMultiplier !== 1) {
            this.raidConfig.carExtractBaseStandingGain *= config_json_1.default.reputation.carExtractMultiplier;
            this.logger.info(`[MultiplyALL-REPUTATION]: carExtractBaseStandingGain multiplied by: ${config_json_1.default.reputation.carExtractMultiplier}`);
        }
        if (config_json_1.default.reputation.scavExtractMultiplier !== 1) {
            this.raidConfig.scavExtractGain *= config_json_1.default.reputation.scavExtractMultiplier;
            this.logger.info(`[MultiplyALL-REPUTATION]: scavExtractGain multiplied by: ${config_json_1.default.reputation.scavExtractMultiplier}`);
        }
    }
    multiplyFleaOfferCount() {
        if (config_json_1.default.flea.offerCountMultiplier !== 1) {
            if (config_json_1.default.flea.offerCountMultiplier % 1 !== 0) {
                this.logger.error("[MultiplyALL-FLEA]: offerCountMultiplier set as a float, it is not supported please set it as integer. Example values: 2, 4, 5, 10");
            }
            else {
                for (let i = 0; i < this.tables.globals.config.RagFair.maxActiveOfferCount.length; i += 1) {
                    this.tables.globals.config.RagFair.maxActiveOfferCount[i].count *= config_json_1.default.flea.offerCountMultiplier;
                }
                this.logger.info(`[MultiplyALL-FLEA]: MaxActiveOfferCount multiplied by: ${config_json_1.default.flea.offerCountMultiplier}`);
            }
        }
    }
    multiplyLoots() {
        if (config_json_1.default.loot.staticLootMultiplier !== 1) {
            for (const i in this.lootConfig.staticLootMultiplier) {
                this.lootConfig.staticLootMultiplier[i] *= config_json_1.default.loot.staticLootMultiplier;
            }
            this.logger.info(`[MultiplyALL-LOOT]: StaticLoot multiplied by: ${config_json_1.default.loot.staticLootMultiplier}`);
        }
        if (config_json_1.default.loot.looseLootMultiplier !== 1) {
            for (const i in this.lootConfig.looseLootMultiplier) {
                this.lootConfig.looseLootMultiplier[i] *= config_json_1.default.loot.looseLootMultiplier;
            }
            this.logger.info(`[MultiplyALL-LOOT]: LooseLoot multiplied by: ${config_json_1.default.loot.looseLootMultiplier}`);
        }
    }
    multiplyWeaponSkillProgressionRate() {
        if (config_json_1.default.experience.weaponSkillMultiplier !== 1) {
            this.tables.globals.config.SkillsSettings.WeaponSkillProgressRate *= config_json_1.default.experience.weaponSkillMultiplier;
            this.logger.info(`[MultiplyALL-XP]: WeaponSkillProgression multiplied by: ${config_json_1.default.experience.weaponSkillMultiplier}`);
        }
    }
    multiplySkillProgressionRate() {
        if (config_json_1.default.experience.skillMultiplier !== 1) {
            this.tables.globals.config.SkillsSettings.SkillProgressRate *= config_json_1.default.experience.skillMultiplier;
            this.tables.globals.config.SkillMinEffectiveness = 1;
            this.tables.globals.config.SkillFatiguePerPoint = 1;
            this.tables.globals.config.SkillFreshEffectiveness = 1;
            this.logger.info(`[MultiplyALL-XP]: SkillProgression multiplied by: ${config_json_1.default.experience.skillMultiplier}`);
        }
    }
    multiplyRaidExitExperience() {
        if (config_json_1.default.experience.raidExitMultiplier !== 1) {
            this.tables.globals.config.exp.match_end.survived_exp_reward = Math.round(this.tables.globals.config.exp.match_end.survived_exp_reward * config_json_1.default.experience.raidExitMultiplier);
            this.tables.globals.config.exp.match_end.mia_exp_reward = Math.round(this.tables.globals.config.exp.match_end.mia_exp_reward * config_json_1.default.experience.raidExitMultiplier);
            this.tables.globals.config.exp.match_end.runner_exp_reward = Math.round(this.tables.globals.config.exp.match_end.runner_exp_reward * config_json_1.default.experience.raidExitMultiplier);
            this.logger.info(`[MultiplyALL-XP]: RaidExitExperience multiplied by: ${config_json_1.default.experience.raidExitMultiplier}`);
        }
    }
    multiplyKills() {
        if (config_json_1.default.experience.killMultiplier !== 1) {
            this.tables.globals.config.exp.kill.victimLevelExp = Math.round(this.tables.globals.config.exp.kill.victimLevelExp * config_json_1.default.experience.killMultiplier);
            this.tables.globals.config.exp.kill.expOnDamageAllHealth = Math.round(this.tables.globals.config.exp.kill.expOnDamageAllHealth * config_json_1.default.experience.killMultiplier);
            this.tables.globals.config.exp.kill.longShotDistance = Math.round(this.tables.globals.config.exp.kill.longShotDistance * config_json_1.default.experience.killMultiplier);
            this.tables.globals.config.exp.kill.victimBotLevelExp = Math.round(this.tables.globals.config.exp.kill.victimBotLevelExp * config_json_1.default.experience.killMultiplier);
            this.logger.info(`[MultiplyALL-XP]: KillExperience multiplied by: ${config_json_1.default.experience.killMultiplier}`);
        }
    }
    multiplyItemValues() {
        const items = this.tables.templates.items;
        let examineExperienceUpdated = 0;
        const examineMultiplierEdited = config_json_1.default.experience.examineMultiplier !== 1;
        if (examineMultiplierEdited) {
            for (let i = 0; i < Object.keys(items).length; i += 1) {
                const item = items[Object.keys(items)[i]];
                if (examineMultiplierEdited) {
                    const examineExperience = item?._props?.ExamineExperience;
                    if (examineExperience >= 0) {
                        items[Object.keys(items)[i]]._props.ExamineExperience = Math.round(examineExperience * config_json_1.default.experience.examineMultiplier);
                        examineExperienceUpdated += 1;
                    }
                }
            }
            if (examineExperienceUpdated > 0) {
                this.logger.info(`[MultiplyALL-XP]: ExamineExperience multiplied by: ${config_json_1.default.experience.examineMultiplier}, Total Items Updated: ${examineExperienceUpdated}`);
            }
        }
    }
    multiplyQuests() {
        const quests = this.tables.templates.quests;
        let updatedQuestExperience = 0;
        let updatedQuestReputation = 0;
        if (config_json_1.default.experience.questMultiplier !== 1 || config_json_1.default.reputation.questMultiplier !== 1) {
            for (let i = 0; i < Object.keys(quests).length; i += 1) {
                const quest = quests[Object.keys(quests)[i]];
                const experienceRewardIndex = quest?.rewards?.Success?.findIndex?.((s) => s.type === "Experience");
                const reputationRewardIndex = quest?.rewards?.Success?.findIndex?.((s) => s.type === "TraderStanding");
                if (experienceRewardIndex >= 0 && config_json_1.default.experience.questMultiplier !== 1) {
                    const reward = quest.rewards.Success[experienceRewardIndex];
                    reward.value = Math.round(parseInt(reward.value.toString()) * config_json_1.default.experience.questMultiplier).toString();
                    quests[Object.keys(quests)[i]].rewards.Success[experienceRewardIndex] = reward;
                    updatedQuestExperience += 1;
                }
                if (reputationRewardIndex && config_json_1.default.reputation.questMultiplier !== 1) {
                    const reputation = quest.rewards.Success[reputationRewardIndex];
                    if (reputation?.value) {
                        reputation.value = (parseFloat(reputation.value.toString()) * config_json_1.default.reputation.questMultiplier).toString();
                        quests[Object.keys(quests)[i]].rewards.Success[reputationRewardIndex] = reputation;
                        updatedQuestReputation += 1;
                    }
                }
            }
            this.logger.info(`[MultiplyALL-XP]: Quests experience multiplied by: ${config_json_1.default.experience.questMultiplier}, Total Quests Updated: ${updatedQuestExperience}`);
            this.logger.info(`[MultiplyALL-XP]: Quests reputation multiplied by: ${config_json_1.default.reputation.questMultiplier}, Total Quests Updated: ${updatedQuestReputation}`);
        }
    }
    multiplyDailiesAndWeeklies() {
        const dailies = this.questConfig.repeatableQuests[0];
        const weeklies = this.questConfig.repeatableQuests[1];
        const dailiesScav = this.questConfig.repeatableQuests[2];
        if (config_json_1.default.experience.dailyWeeklyMultiplier !== 1) {
            if (dailies.rewardScaling?.experience?.length) {
                dailies.rewardScaling.experience = dailies.rewardScaling.experience.map((exp) => Math.round(exp * config_json_1.default.experience.dailyWeeklyMultiplier));
                this.logger.info(`[MultiplyALL-XP]: Dailies multiplied by: ${config_json_1.default.experience.dailyWeeklyMultiplier}`);
            }
            if (weeklies.rewardScaling?.experience?.length) {
                weeklies.rewardScaling.experience = weeklies.rewardScaling.experience.map((exp) => Math.round(exp * config_json_1.default.experience.dailyWeeklyMultiplier));
                this.logger.info(`[MultiplyALL-XP]: Weeklies multiplied by: ${config_json_1.default.experience.dailyWeeklyMultiplier}`);
            }
            if (dailiesScav.rewardScaling?.experience?.length) {
                dailiesScav.rewardScaling.experience = dailiesScav.rewardScaling.experience.map((exp) => Math.round(exp * config_json_1.default.experience.dailyWeeklyMultiplier));
                this.logger.info(`[MultiplyALL-XP]: Dailies [Scav] multiplied by: ${config_json_1.default.experience.dailyWeeklyMultiplier}`);
            }
        }
        if (config_json_1.default.money.dailyWeeklyMultiplier !== 1) {
            if (dailies.rewardScaling?.roubles?.length) {
                dailies.rewardScaling.roubles = dailies.rewardScaling.roubles.map((exp) => Math.round(exp * config_json_1.default.money.dailyWeeklyMultiplier));
                this.logger.info(`[MultiplyALL-ROUBLES]: Dailies multiplied by: ${config_json_1.default.money.dailyWeeklyMultiplier}`);
            }
            if (weeklies.rewardScaling?.roubles?.length) {
                weeklies.rewardScaling.roubles = weeklies.rewardScaling.roubles.map((exp) => Math.round(exp * config_json_1.default.money.dailyWeeklyMultiplier));
                this.logger.info(`[MultiplyALL-ROUBLES]: Weeklies multiplied by: ${config_json_1.default.money.dailyWeeklyMultiplier}`);
            }
            if (dailiesScav.rewardScaling?.roubles?.length) {
                dailiesScav.rewardScaling.roubles = dailiesScav.rewardScaling.roubles.map((exp) => Math.round(exp * config_json_1.default.money.dailyWeeklyMultiplier));
                this.logger.info(`[MultiplyALL-ROUBLES]: Dailies [Scav] multiplied by: ${config_json_1.default.money.dailyWeeklyMultiplier}`);
            }
        }
        if (config_json_1.default.reputation.dailyWeeklyMultiplier !== 1) {
            if (dailies.rewardScaling?.reputation?.length) {
                dailies.rewardScaling.reputation = dailies.rewardScaling.reputation.map((exp) => exp * config_json_1.default.reputation.dailyWeeklyMultiplier);
                this.logger.info(`[MultiplyALL-REPUTATION]: Dailies multiplied by: ${config_json_1.default.reputation.dailyWeeklyMultiplier}`);
            }
            if (weeklies.rewardScaling?.reputation?.length) {
                weeklies.rewardScaling.reputation = weeklies.rewardScaling.reputation.map((exp) => exp * config_json_1.default.reputation.dailyWeeklyMultiplier);
                this.logger.info(`[MultiplyALL-REPUTATION]: Weeklies multiplied by: ${config_json_1.default.reputation.dailyWeeklyMultiplier}`);
            }
            if (dailiesScav.rewardScaling?.reputation?.length) {
                dailiesScav.rewardScaling.reputation = dailiesScav.rewardScaling.reputation.map((exp) => exp * config_json_1.default.reputation.dailyWeeklyMultiplier);
                this.logger.info(`[MultiplyALL-REPUTATION]: Dailies [Scav] multiplied by: ${config_json_1.default.reputation.dailyWeeklyMultiplier}`);
            }
        }
    }
}
module.exports = { mod: new MultiplyALL() };
//# sourceMappingURL=mod.js.map