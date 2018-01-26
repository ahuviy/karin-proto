import { getDb } from './db-internal.api';
import * as server from 'server/server.interface';
import { adaptCompositeItem } from './adaptors.functions';

class CompositeItemsApi {
    getById(id: string): server.CompositeItem {
        return adaptCompositeItem(getDb().compositeItems.find(ci => ci.id === id));
    }

    getByUserId(userId: string): server.CompositeItem[] {
        return getDb().compositeItems
            .filter(ci => ci.userId === userId)
            .map(adaptCompositeItem);
    }
}

export const compositeItemsApi = new CompositeItemsApi();
