import { db } from '../../db/db.api';
import { DEFAULT_USER_ID } from '../server.consts';
import { BaseItem } from '../server.interface';

class BaseItemsApi {
    get(): Promise<BaseItem[]> {
        return Promise.resolve(db.baseItems.getByUserId(DEFAULT_USER_ID));
    }

    put(edited: BaseItem): Promise<BaseItem> {
        const success = db.baseItems.updateById(edited, edited.id);
        const retval = success ? edited : null;
        return Promise.resolve(retval);
    }

    // post(newItem: BaseItem): Promise<BaseItem> {
    //     return Promise.resolve(db.baseItems.create(newItem, DEFAULT_USER_ID));
    // }

    // delete(id: string): Promise<{ success: boolean; }> {
    //     const status = db.distributors.delete(id);
    //     return Promise.resolve({ success: status });
    // }
}

export const baseItemsApi = new BaseItemsApi();
