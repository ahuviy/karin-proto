import { getDb } from './db-internal.api';
import * as server from 'server/server.interface';
import { adaptItemCategory } from './adaptors.functions';

class ItemCategoriesApi {
    getById(id: string): server.ItemCategory {
        return adaptItemCategory(getDb().itemCategories.find(ic => ic.id === id));
    }

    getByUserId(userId: string): server.ItemCategory[] {
        return getDb().itemCategories
            .filter(ic => ic.userId === userId)
            .map(adaptItemCategory);
    }
}

export const itemCategoriesApi = new ItemCategoriesApi();
