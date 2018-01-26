import { db } from '../../db/db.api';
import { DEFAULT_USER_ID } from '../server.consts';
import { Settings } from '../server.interface';

class SettingsApi {
    get(): Promise<Settings> {
        return Promise.resolve(db.settings.getByUserId(DEFAULT_USER_ID));
    }

    put(s: Settings): Promise<Settings> {
        return Promise.resolve(db.settings.updateByUserId(s, DEFAULT_USER_ID));
    }
}

export const settingsApi = new SettingsApi();
