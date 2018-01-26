import { getDb } from './db-internal.api';
import * as server from 'server/server.interface';

class UsersApi {
    getById(id: string): server.User {
        return getDb().users.find(u => u.id === id);
    }
}

export const usersApi = new UsersApi();
