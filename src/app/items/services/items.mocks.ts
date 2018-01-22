export const MOCK_ITEMS: Item[] = [
    {
        id: 'wefawef',
        name: 'מסה בחושה',
        weight: 20,
        weightUnit: 'גרם',
        price: 10,
        category: 'מסות'
    }
];

export interface Item {
    id: string;
    name: string;
    weight: number;
    weightUnit: string;
    price: number;
    category: string;
}
