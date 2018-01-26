import { db } from '../../db/db.api';
import { DEFAULT_USER_ID } from '../server.consts';
import { Distributor } from '../server.interface';

class DistributorApi {
    get(): Promise<Distributor[]> {
        return Promise.resolve(db.distributors.getByUserId(DEFAULT_USER_ID));
    }

    put(editedDist: Distributor): Promise<Distributor> {
        return Promise.resolve(db.distributors.updateById(editedDist, editedDist.id));
    }

    post(newDist: Distributor): Promise<Distributor> {
        return Promise.resolve(db.distributors.create(newDist, DEFAULT_USER_ID));
    }

    delete(id: string): Promise<{ success: boolean; }> {
        const status = db.distributors.delete(id);
        return Promise.resolve({ success: status });
    }
}

export const distributorApi = new DistributorApi();
