import * as storage from './functions/local-storage.functions';
import { Db, BaseItem } from './db.model';
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

export function saveDb() {
    if (!cachedDb) throw 'cannot save a non-existent db';
    storage.set(DB_KEY, cachedDb);
}
