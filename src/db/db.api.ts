import * as storage from './local-storage.functions';
import { Db, User, BaseItem, CompositeItem, ItemCategory, Distributor, Settings } from './db.model';
import { DB_KEY } from './db.consts';

const DEFAULT_STARTING_ID = 1;
let cachedDb: Db;
let currentId = DEFAULT_STARTING_ID;  // ids will be assigned in ascending numerical order starting from 1.

getDb(); // initialize the db (or restore a previous version)
if (currentId === DEFAULT_STARTING_ID) {
    // We didn't initialize the db. We need to set currentId to the last id in the cached Db.
    currentId = getLastId(cachedDb) + 1;
}

export function getId(): string {
    const newId = currentId++;
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
    if (!cachedDb) throw new Error('cannot save a non-existent db');
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
            { id: getId(), name: 'אפי', phoneNumber: '0541234561', daysToDeliver: 2, percentDiscount: 0 },
            { id: getId(), name: 'שלומי', phoneNumber: '0528769696', daysToDeliver: 4, percentDiscount: 0 },
            { id: getId(), name: 'גיורא', phoneNumber: '0504437722', daysToDeliver: 1, percentDiscount: 10 },
        ];
    }

    function initBaseItems(): BaseItem[] {
        return [
            {
                id: getId(),
                distributorId: user.distributors[0].id,
                name: 'אורז בסמטי',
                weight: 5,
                weightUnit: 'kilogram',
                price: 25,
                priceBy: 'weight',
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

function getLastId(db) {
    if (!db) return 1;
    return db.users.reduce((accumulator, u) => {
        const maxBaseItemsId = u.baseItems.reduce((acc, bi) => Math.max(acc, +bi.id), 0);
        const maxCompositeItemsId = u.compositeItems.reduce((acc, ci) => Math.max(acc, +ci.id), 0);
        const maxDistributorsId = u.distributors.reduce((acc, dist) => Math.max(acc, +dist.id), 0);
        const maxCategoriesId = u.itemCategories.reduce((acc, cat) => Math.max(acc, +cat.id), 0);
        return Math.max(accumulator, +u.id, maxBaseItemsId, maxCategoriesId, maxCompositeItemsId, maxDistributorsId);
    }, 0);
}
