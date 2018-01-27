import { Db, User, BaseItem, CompositeItem, ItemCategory, Distributor, Settings } from '../db.model';

let currentId = 1;  // ids will be assigned in ascending numerical order starting from 1.

export function getId(): string {
    let newId = currentId++;
    return newId.toString();
}

export function getInitialDb(): Db {
    const user: User = {
        id: getId(),
        username: 'ahuviy',
        password: 'qwer1234',
        firstName: 'אהובי',
        lastName: 'יערים',
        settings: {
            percentVat: 18,
            currency: { name: 'שקלים', symbol: 'ש״ח' },
            workCostPerHour: 10,
        },
        distributors: [],
        itemCategories: [],
        baseItems: [],
        compositeItems: [],
    };
    user.distributors = initDistributors();
    user.baseItems = initBaseItems();
    user.compositeItems = initCompositeItems();
    user.itemCategories = initItemCategories();

    return { users: [user] };

    function initDistributors(): Distributor[] {
        return [
            { id: getId(), name: 'אפי', phoneNumber: '0541234561' },
            { id: getId(), name: 'שלומי', phoneNumber: '0528769696' },
            { id: getId(), name: 'גיורא', phoneNumber: '0504437722' },
        ];
    }

    function initBaseItems(): BaseItem[] {
        return [
            {
                id: getId(),
                distributorId: user.distributors[0].id,
                compositeItemIds: [],
                name: 'אורז בסמטי',
                weight: 250,
                weightUnit: 'gram',
                price: 12,
                itemCategoryId: null,
            },
        ];
    }

    function initCompositeItems(): CompositeItem[] {
        return [];
    }

    function initItemCategories(): ItemCategory[] {
        return [];
    }
}
