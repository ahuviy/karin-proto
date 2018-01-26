import { genUniqId } from 'functions/util.functions';

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

const names = ['גבינה', 'ביצים', 'נקניק', 'קמח', 'שמרים', 'שוקולד', 'תותים', 'מנגו', 'מלח'];
export const MOCK_MATERIALS: Material[] = generateMockMaterials();


function generateMockMaterials(): Material[] {
    let mock: Material[] = [];
    names.forEach(n => {
        mock.push({
            id: genUniqId(mock.map(m => m.id)),
            name: n,
            distributorId: genUniqId([]),
            distributorName: 'אפי',
            weight: Math.floor(Math.random() * 100),
            weightUnit: 'גרם',
            price: Math.floor(Math.random() * 100),
            priceUnit: 'ש״ח'
        });
    });
    return mock;
}
