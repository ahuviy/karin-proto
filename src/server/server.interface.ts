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
}

export interface BaseItem {
    id: string;
    distributorId: string;
    name: string;
    weight: number;
    weightUnit: WeightUnit;
    price: number;
    itemCategoryId: string;
}

export interface CompositeItem {
    id: string;
    hoursOfWork: number;
    ingredients: {
        baseItemId: string;
        amount: number;
    }[];
    itemCategoryId: string;
}

export interface ItemCategory {
    id: string;
    name: string;
}

export type WeightUnit = 'gram' | 'kilogram';
