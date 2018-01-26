export type WeightUnit = 'gram' | 'kilogram';

export interface User {
    id: string;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
}

export interface Settings {
    id: string;
    userId: string;
    percentVat: number;
    currency: {
        id: string;
        label: string;
    };
    workCostPerHour: number;
}

export interface Distributor {
    id: string;
    userId: string;
    name: string;
}

export interface ItemCategory {
    id: string;
    userId: string;
    name: string;
    baseItemIds: string[];  // baseItems that are attached to this category
    compositeItemIds: string[];  // compositeItems that are attached to this category
}

export interface BaseItem {
    id: string;
    userId: string;
    distributorId: string;
    compositeItemIds: string[];  // compositeItems that are using this baseItem
    name: string;
    weight: number;
    weightUnit: WeightUnit;
    price: number;
}

export interface CompositeItem {
    id: string;
    userId: string;
    hoursOfWork: number;
    baseItems: {
        id: string;
        amount: number;
    }[];
}

export interface Db {
    users: User[];
    settings: Settings[];
    distributors: Distributor[];
    baseItems: BaseItem[];
    compositeItems: CompositeItem[];
    itemCategories: ItemCategory[];
}
