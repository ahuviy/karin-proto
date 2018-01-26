import { db } from '../../db/db.api';
import { DEFAULT_USER_ID } from '../server.consts';
import { User } from '../server.interface';

class UsersApi {
    getCurrent(): Promise<User> {
        return Promise.resolve(db.users.getById(DEFAULT_USER_ID));
    }
}

export const usersApi = new UsersApi();
