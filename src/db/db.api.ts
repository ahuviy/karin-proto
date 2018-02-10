import * as storage from './local-storage.functions';
import { Db, User, BaseItem, CompositeItem, ItemCategory, Distributor, Settings } from './db.model';
import { DB_KEY } from './db.consts';

let cachedDb: Db;
let currentId = 1;  // ids will be assigned in ascending numerical order starting from 1.

export function getId(): string {
    let newId = currentId++;
    return newId.toString();
}

export function getDb(): Db {
    if (!cachedDb) {
        const savedDb = storage.get(DB_KEY);
        if (savedDb) {
            cachedDb = savedDb;
        } else {
            cachedDb = getInitialDb();
            storage.set(DB_KEY, cachedDb);
        }
    }
    return cachedDb;
}

export function saveDb() {
    if (!cachedDb) throw 'cannot save a non-existent db';
    storage.set(DB_KEY, cachedDb);
}

function getInitialDb(): Db {
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
    user.itemCategories = initItemCategories();
    user.baseItems = initBaseItems();
    user.compositeItems = initCompositeItems();

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
                name: 'אורז בסמטי',
                weight: 250,
                weightUnit: 'gram',
                price: 12,
                itemCategoryId: null,
            },
        ];
    }

    function initCompositeItems(): CompositeItem[] {
        return [
            {
                id: getId(),
                name: 'עוגת ביסקוויט',
                hoursOfWork: 5,
                ingredients: [
                    {
                        baseItemId: user.baseItems[0].id,
                        amount: 4,
                    }
                ],
                itemCategoryId: user.itemCategories[1].id,
            }
        ];
    }

    function initItemCategories(): ItemCategory[] {
        return [
            { id: getId(), name: 'מסות' },
            { id: getId(), name: 'עוגות' },
        ];
    }
}
