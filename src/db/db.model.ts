export type WeightUnit = 'gram' | 'kilogram';

export interface User {
    id: string;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    settings: {
        percentVat: number;
        currency: {
            name: string;
            symbol: string;
        };
        workCostPerHour: number;
    };
    distributors: {
        id: string;
        name: string;
        phoneNumber: string;
    }[];
    itemCategories: {
        id: string;
        name: string;
    }[];
    baseItems: {
        id: string;
        distributorId: string;
        compositeItemIds: string[];  // compositeItems that are using this baseItem
        name: string;
        weight: number;
        weightUnit: WeightUnit;
        price: number;
        itemCategoryId: string;
    }[];
    compositeItems: {
        id: string;
        hoursOfWork: number;
        ingredients: {
            baseItemId: string;
            amount: number;
        }[];
        itemCategoryId: string;
    }[];
}

export interface Db {
    users: User[];
}
