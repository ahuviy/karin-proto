import * as cloneDeep from 'lodash/cloneDeep';

import { getDb, saveDb, getId } from '../db/db.api';
import { DEFAULT_USER_ID } from './server.consts';
import { User, UserBasic, Settings, Distributor, BaseItem, CompositeItem, ItemCategory } from './server.interface';

export const api = {

    user: {
        getCurrent(): Promise<UserBasic> {
            const user = getCurrentUser();
            return Promise.resolve({
                id: user.id,
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
            });
        }
    },

    settings: {
        get(): Promise<Settings> {
            const user = getCurrentUser();
            return Promise.resolve(cloneDeep(user.settings));
        },
        update(s: Partial<Settings>): Promise<Settings> {
            s = cloneDeep(s);
            const user = getCurrentUser();
            Object.assign(user.settings, s);
            saveDb();
            return Promise.resolve(cloneDeep(user.settings));
        }
    },

    distributor: {
        getAll(): Promise<Distributor[]> {
            const user = getCurrentUser();
            return Promise.resolve(cloneDeep(user.distributors));
        },
        update(updated: Partial<Distributor>): Promise<Distributor> {
            updated = cloneDeep(updated);
            const user = getCurrentUser();
            const i = user.distributors.findIndex(d => d.id === updated.id);
            Object.assign(user.distributors[i], updated);
            saveDb();
            return Promise.resolve(cloneDeep(user.distributors[i]));
        },
        create(created: Partial<Distributor>): Promise<Distributor> {
            created = cloneDeep(created);
            const user = getCurrentUser();
            created.id = getId();
            user.distributors.push(created as Distributor);
            saveDb();
            return Promise.resolve(cloneDeep(created));
        },
        delete(id: string): Promise<{ success: boolean; err: any; }> {
            const user = getCurrentUser();

            const connectedToBaseItemIds = user.baseItems
                .filter(bi => bi.distributorId === id)
                .map(bi => bi.id);
            if (connectedToBaseItemIds.length) {
                return Promise.resolve({
                    success: false,
                    err: {
                        type: 'CONNECTED_TO_BASE_ITEMS',
                        params: { connectedToBaseItemIds }
                    }
                });
            }

            const i = user.distributors.findIndex(d => d.id === id);
            user.distributors.splice(i, 1);
            saveDb();
            return Promise.resolve({ success: true, err: null });
        }
    },

    baseItem: {
        getAll(): Promise<BaseItem[]> {
            const user = getCurrentUser();
            return Promise.resolve(cloneDeep(user.baseItems));
        },
        update(updated: Partial<BaseItem>): Promise<BaseItem> {
            updated = cloneDeep(updated);
            const user = getCurrentUser();
            const i = user.baseItems.findIndex(bi => bi.id === updated.id);
            Object.assign(user.baseItems[i], updated);
            if (updated.priceBy === 'package') {
                user.baseItems[i].weight = null;
                user.baseItems[i].weightUnit = null;
            }
            saveDb();
            return Promise.resolve(cloneDeep(user.baseItems[i]));
        },
        create(created: Partial<BaseItem>): Promise<BaseItem> {
            created = cloneDeep(created);
            const user = getCurrentUser();
            created.id = getId();
            user.baseItems.push(created as BaseItem);
            saveDb();
            return Promise.resolve(cloneDeep(created));
        },
        delete(id: string): Promise<{ success: boolean; err: any; }> {
            const user = getCurrentUser();

            const usedByCompositeItemIds = user.compositeItems
                .filter(ci => ci.ingredients.some(ing => ing.baseItemId === id))
                .map(ci => ci.id);
            if (usedByCompositeItemIds.length) {
                return Promise.resolve({
                    success: false,
                    err: {
                        type: 'USED_BY_COMPOSITE_ITEMS',
                        params: { usedByCompositeItemIds }
                    }
                });
            }

            const i = user.baseItems.findIndex(bi => bi.id === id);
            user.baseItems.splice(i, 1);
            saveDb();
            return Promise.resolve({ success: true, err: null });
        }
    },

    compositeItem: {
        getAll(): Promise<CompositeItem[]> {
            const user = getCurrentUser();
            return Promise.resolve(cloneDeep(user.compositeItems));
        },
        update(updated: Partial<CompositeItem>): Promise<CompositeItem> {
            updated = cloneDeep(updated);
            const user = getCurrentUser();
            const i = user.compositeItems.findIndex(ci => ci.id === updated.id);
            Object.assign(user.compositeItems[i], updated);
            saveDb();
            return Promise.resolve(cloneDeep(user.compositeItems[i]));
        },
        create(created: Partial<CompositeItem>): Promise<CompositeItem> {
            created = cloneDeep(created);
            const user = getCurrentUser();
            created.id = getId();
            user.compositeItems.push(created as CompositeItem);
            saveDb();
            return Promise.resolve(cloneDeep(created));
        },
        delete(id: string): Promise<{ success: boolean; err: any; }> {
            const user = getCurrentUser();
            const i = user.compositeItems.findIndex(ci => ci.id === id);
            user.compositeItems.splice(i, 1);
            saveDb();
            return Promise.resolve({ success: true, err: null });
        }
    },

    itemCategories: {
        getAll(): Promise<ItemCategory[]> {
            const user = getCurrentUser();
            return Promise.resolve(cloneDeep(user.itemCategories));
        },
        update(updated: Partial<ItemCategory>): Promise<ItemCategory> {
            updated = cloneDeep(updated);
            const user = getCurrentUser();
            const i = user.itemCategories.findIndex(ic => ic.id === updated.id);
            Object.assign(user.itemCategories[i], updated);
            saveDb();
            return Promise.resolve(cloneDeep(user.itemCategories[i]));
        },
        create(created: Partial<ItemCategory>): Promise<ItemCategory> {
            created = cloneDeep(created);
            const user = getCurrentUser();
            created.id = getId();
            user.itemCategories.push(created as ItemCategory);
            saveDb();
            return Promise.resolve(cloneDeep(created));
        },
        delete(id: string): Promise<{ success: boolean; err: any; }> {
            const user = getCurrentUser();
            user.baseItems.forEach(clearDeletedCategory);
            user.compositeItems.forEach(clearDeletedCategory);

            const i = user.itemCategories.findIndex(ic => ic.id === id);
            user.itemCategories.splice(i, 1);
            saveDb();

            return Promise.resolve({ success: true, err: null });

            function clearDeletedCategory(item) {
                if (item.itemCategoryId === id) {
                    item.itemCategoryId = undefined;
                }
            }
        }
    },
};

function getCurrentUser(): User {
    return getDb().users.find(u => u.id === DEFAULT_USER_ID);
}
