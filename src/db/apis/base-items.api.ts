import { getDb, saveDb } from './db-internal.api';
import * as Db from 'db/db.model';
import * as server from 'server/server.interface';
import { adaptBaseItem } from './adaptors.functions';
import { getId } from '../functions/init.functions';
import { distributorsApi } from './distributors.api';

class BaseItemsApi {
    getAll(): server.BaseItem[] {
        return getDb().baseItems.map(adaptBaseItem);
    }

    getById(id: string): server.BaseItem {
        return adaptBaseItem(getDb().baseItems.find(bi => bi.id === id));
    }

    getByUserId(userId: string): server.BaseItem[] {
        return getDb().baseItems
            .filter(bi => bi.userId === userId)
            .map(adaptBaseItem);
    }

    updateById(edited: server.BaseItem, id: string): boolean {
        // const i = getDb().baseItems.findIndex(bi => bi.id === id);
        // if (i === -1) {
        //     return false;
        // } else {
        //     const afterEdit = Object.assign({}, getDb().baseItems[i], {
        //         userId: userId,
        //         compositeItemIds: [],
        //         distributorId: newItem.distributor.id,
        //     });
        //     delete afterEdit.hasCompositeItems;
        //     delete afterEdit.distributor;



        //     delete edited.hasCompositeItems;
        //     Object.assign(getDb().baseItems[i], edited);
        //     saveDb();
        //     return true;
        // }
        return true;
    }

    create(newItem: server.BaseItem, userId: string): Db.BaseItem {
        const newEntry = Object.assign({}, newItem, {
            id: getId(),
            userId: userId,
            compositeItemIds: [],
            distributorId: newItem.distributor.id,
        });
        delete newEntry.hasCompositeItems;
        delete newEntry.distributor;
        getDb().baseItems.push(newEntry);
        saveDb();
        return newEntry;
    }
}

export const baseItemsApi = new BaseItemsApi();
