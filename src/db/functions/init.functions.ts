import * as Db from '../db.interface';

let currentId = 1;  // ids will be assigned in ascending numerical order starting from 1.

function getId(): string {
    let newId = currentId++;
    return newId.toString();
}

export function getInitialDb(): Db.Db {
    const users = initUsers();
    const settings = initSettings();
    const distributors = initDistributors();
    const baseItems = initBaseItems();
    const compositeItems = initCompositeItems();
    const itemCategories = initItemCategories();

    return { users, settings, distributors, baseItems, compositeItems, itemCategories };

    function initUsers(): Db.User[] {
        return [
            {
                id: getId(),
                firstName: 'אהובי',
                lastName: 'יערים',
                username: 'ahuviy',
                password: 'qwer1234',
            },
        ];
    }

    function initSettings(): Db.Settings[] {
        return [
            {
                id: getId(),
                userId: users[0].id,
                percentVat: 18,
                workCostPerHour: 10,
                currency: { id: getId(), label: 'ש״ח' },
            },
        ];
    }

    function initDistributors(): Db.Distributor[] {
        return ['אפי', 'עומרי', 'גיורא'].map(n => ({
            id: getId(),
            userId: users[0].id,
            name: n,
        }));
    }

    function initBaseItems(): Db.BaseItem[] {
        return [
            {
                id: getId(),
                userId: users[0].id,
                distributorId: distributors[0].id,
                compositeItemIds: [],
                name: 'אורז בסמטי',
                weight: 250,
                weightUnit: 'gram',
                price: 12,
            },
        ];
    }

    function initCompositeItems(): Db.CompositeItem[] {
        return [];
    }

    function initItemCategories(): Db.ItemCategory[] {
        return [];
    }
}
