export const MOCK_ITEMS: Item[] = [
    {
        id: 'wefawef',
        name: 'מסה בחושה',
        weight: 20,
        price: 10,
        category: 'מסות'
    }
];

export interface Item {
    id: string;
    name: string;
    weight: number;
    price: number;
    category: string;
}
