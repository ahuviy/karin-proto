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
    percentVat: number;
    currency: {
        id: string;
        label: string;
    };
    workCostPerHour: number;
}

export interface Distributor {
    id: string;
    name: string;
}

export interface BaseItem {
    id: string;
    name: string;
    weight: number;
    weightUnit: WeightUnit;
    price: number;
    distributor: Distributor;
    hasCompositeItems: boolean;
}

export interface CompositeItem {
    id: string;
    hoursOfWork: number;
    baseItems: {
        id: string;
        amount: number;
    }[];
}

export interface ItemCategory {
    id: string;
    name: string;
    baseItems: BaseItem[];  // baseItems that are attached to this category
    compositeItems: CompositeItem[];  // compositeItems that are attached to this category
}
