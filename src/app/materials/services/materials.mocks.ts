export interface Material {
    id: string;
    name: string;
    distributorId: string;
    distributorName: string;
    weight: number;
    weightUnit: string;
    price: number;
    priceUnit: string;
}

export const MOCK_MATERIALS: Material[] = [
    {
        id: '0',
        name: 'גבינה',
        distributorId: 'asdf',
        distributorName: 'אפי',
        weight: 10,
        weightUnit: 'גרם',
        price: 5,
        priceUnit: 'ש״ח',
    },
];
