export interface ModConfig {
    enableDebugging: boolean;
    mapbookItemId: string;
    specialSlotsList: string[];
}

export interface SecureContainers {
    KAPPA: string;
    GAMMA: string;
    GAMMA_TUE: string;
    EPSILON: string;
    BETA: string;
    ALPHA: string;
    WAIST_POUCH: string;
    [key: string]: string;
}

export interface OrganizationalPouch {
    SICC_organizational_pouch: string;
}

export interface GameMaps {
    groundZero: string;
    streets: string;
    reserve: string;
    labs: string;
    lighthouse: string;
    factory: string;
    woods: string;
    interchange: string;
    shoreline: string;
    customs: string;
    sanatorium: string;
}

export interface ModConfig {
    enableDebugging: boolean;
    mapbookItemId: string;
    traderId: string;
    price: number;
    loyaltyLevel: number;
    allowInsurance: boolean;
    allowInSecureContainers: boolean;
    allowInSpecialSlots: boolean;
    secureContainers: SecureContainers;
    organizationalPouch: OrganizationalPouch;
    maps: GameMaps;
}