"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InstanceManager = void 0;
class InstanceManager {
    //#region Accessible in or after preAkiLoad
    alpha = false;
    version = "";
    // Instances
    container;
    preSptModLoader;
    configServer;
    saveServer;
    itemHelper;
    logger;
    staticRouter;
    fs;
    hashUtil;
    httpResponseUtil;
    //#endregion
    //#region Acceessible in or after postDBLoad
    database;
    customItem;
    imageRouter;
    jsonUtil;
    profileHelper;
    ragfairPriceService;
    importerUtil;
    customItemService;
    mailSendService;
    traderHelper;
    //#endregion
    // Call at the start of the mods postDBLoad method
    preSptLoad(container) {
        this.container = container;
        this.preSptModLoader = container.resolve("PreSptModLoader");
        this.imageRouter = container.resolve("ImageRouter");
        this.configServer = container.resolve("ConfigServer");
        this.saveServer = container.resolve("SaveServer");
        this.itemHelper = container.resolve("ItemHelper");
        this.logger = container.resolve("WinstonLogger");
        this.staticRouter = container.resolve("StaticRouterModService");
        this.fs = container.resolve("FileSystemSync");
        this.hashUtil = container.resolve("HashUtil");
        this.httpResponseUtil = container.resolve("HttpResponseUtil");
    }
    postDBLoad(container) {
        this.database = container.resolve("DatabaseServer").getTables();
        this.customItem = container.resolve("CustomItemService");
        this.jsonUtil = container.resolve("JsonUtil");
        this.profileHelper = container.resolve("ProfileHelper");
        this.ragfairPriceService = container.resolve("RagfairPriceService");
        this.importerUtil = container.resolve("ImporterUtil");
        this.customItemService = container.resolve("CustomItemService");
        this.mailSendService = container.resolve("MailSendService");
        this.traderHelper = container.resolve("TraderHelper");
    }
}
exports.InstanceManager = InstanceManager;
//# sourceMappingURL=InstanceManager.js.map