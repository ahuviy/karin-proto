export interface Db {
    users: User[];
}

export interface User {
    id: string;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    settings: Settings;
    distributors: Distributor[];
    itemCategories: ItemCategory[];
    baseItems: BaseItem[];
    compositeItems: CompositeItem[];
}

export interface Settings {
    percentVat: number;
    currency: {
        name: string;
        symbol: string;
    };
    workCostPerHour: number;
}

export interface Distributor {
    id: string;
    name: string;
    phoneNumber: string;
    daysToDeliver: number;
    percentDiscount: number;
}

export interface ItemCategory {
    id: string;
    name: string;
}

export interface BaseItem {
    id: string;
    distributorId: string;
    name: string;
    weight: number;  // is undefined if priceBy = 'package'
    weightUnit: WeightUnit;  // is undefined if priceBy = 'package'
    price: number;
    priceBy: 'weight' | 'package';
    itemCategoryId: string;
}

export interface CompositeItem {
    id: string;
    name: string;
    hoursOfWork: number;
    ingredients: {
        baseItemId: string;
        amount: number;
    }[];
    itemCategoryId: string;
}

export type WeightUnit = 'gram' | 'kilogram';
