import * as storage from './functions/local-storage.functions';
import { Db } from './db.interface';
import { DB_KEY } from './db.consts';
import { getInitialDb } from './functions/init.functions';

let cachedDb: Db;

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
