import { getDb, saveDb } from './db-internal.api';
import * as server from 'server/server.interface';
import { adaptDistributor } from './adaptors.functions';
import { getId } from '../functions/init.functions';

class DistributorsApi {
    getAll(): server.Distributor[] {
        return getDb().distributors.map(adaptDistributor);
    }

    getById(id: string): server.Distributor {
        return adaptDistributor(getDb().distributors.find(d => d.id === id));
    }

    getByUserId(userId: string): server.Distributor[] {
        return getDb().distributors
            .filter(d => d.userId === userId)
            .map(adaptDistributor);
    }

    updateById(newDist: server.Distributor, id: string): server.Distributor {
        const i = getDb().distributors.findIndex(d => d.id === id);
        if (i === -1) {
            return null;
        } else {
            Object.assign(getDb().distributors[i], newDist);
            saveDb();
            return newDist;
        }
    }

    create(distributor: server.Distributor, userId: string): server.Distributor {
        distributor.id = getId();
        const newEntry = {
            id: distributor.id,
            name: distributor.name,
            userId: userId,
        };
        getDb().distributors.push(newEntry);
        saveDb();
        return distributor;
    }

    delete(id: string): boolean {
        const i = getDb().distributors.findIndex(d => d.id === id);
        if (i === -1) {
            return false;
        } else {
            getDb().distributors.splice(i, 1);
            saveDb();
            return true;
        }
    }
}

export const distributorsApi = new DistributorsApi();
