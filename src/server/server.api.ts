import { getDb, saveDb, getId } from '../db/db.api';
import { DEFAULT_USER_ID } from './server.consts';
import { User, Settings, Distributor, BaseItem, CompositeItem, ItemCategory } from './server.interface';

export const api = {

    user: {
        getCurrent(): Promise<User> {
            return Promise.resolve(getCurrentUser());
        }
    },

    settings: {
        get(): Promise<Settings> {
            const user = getCurrentUser();
            return Promise.resolve(user.settings);
        },
        update(s: Partial<Settings>): Promise<Settings> {
            const user = getCurrentUser();
            Object.assign(user.settings, s);
            saveDb();
            return Promise.resolve(user.settings);
        }
    },

    distributor: {
        update(updated: Partial<Distributor>): Promise<Distributor> {
            const user = getCurrentUser();
            const i = user.distributors.findIndex(d => d.id === updated.id);
            Object.assign(user.distributors[i], updated);
            saveDb();
            return Promise.resolve(user.distributors[i]);
        },
        create(created: Distributor): Promise<Distributor> {
            const user = getCurrentUser();
            created.id = getId();
            user.distributors.push(created);
            saveDb();
            return Promise.resolve(created);
        },
        delete(id: string): Promise<{ success: boolean; }> {
            const user = getCurrentUser();
            const i = user.distributors.findIndex(d => d.id === id);
            user.distributors.splice(i, 1);
            saveDb();
            return Promise.resolve({ success: true });
        }
    },

    baseItem: {
        getAll(): Promise<BaseItem[]> {
            const user = getCurrentUser();
            return Promise.resolve(user.baseItems);
        },
        update(updated: Partial<BaseItem>): Promise<BaseItem> {
            const user = getCurrentUser();
            const i = user.baseItems.findIndex(bi => bi.id === updated.id);
            Object.assign(user.baseItems[i], updated);
            saveDb();
            return Promise.resolve(user.baseItems[i]);
        },
        create(created: BaseItem): Promise<BaseItem> {
            const user = getCurrentUser();
            created.id = getId();
            user.baseItems.push(created);
            saveDb();
            return Promise.resolve(created);
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
        update(updated: Partial<CompositeItem>): Promise<CompositeItem> {
            const user = getCurrentUser();
            const i = user.compositeItems.findIndex(ci => ci.id === updated.id);
            Object.assign(user.compositeItems[i], updated);
            saveDb();
            return Promise.resolve(user.compositeItems[i]);
        },
        create(created: CompositeItem): Promise<CompositeItem> {
            const user = getCurrentUser();
            created.id = getId();
            user.compositeItems.push(created);
            saveDb();
            return Promise.resolve(created);
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
        update(updated: Partial<ItemCategory>): Promise<ItemCategory> {
            const user = getCurrentUser();
            const i = user.itemCategories.findIndex(ic => ic.id === updated.id);
            Object.assign(user.itemCategories[i], updated);
            saveDb();
            return Promise.resolve(user.itemCategories[i]);
        },
        create(created: ItemCategory): Promise<ItemCategory> {
            const user = getCurrentUser();
            created.id = getId();
            user.itemCategories.push(created);
            saveDb();
            return Promise.resolve(created);
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
