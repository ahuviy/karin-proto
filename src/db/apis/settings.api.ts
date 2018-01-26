import { getDb, saveDb } from './db-internal.api';
import * as server from 'server/server.interface';
import { adaptSettings } from './adaptors.functions';

class SettingsApi {
    getById(id: string): server.Settings {
        return adaptSettings(getDb().settings.find(s => s.id === id));
    }

    getByUserId(userId: string): server.Settings {
        return adaptSettings(getDb().settings.find(s => s.userId === userId));
    }

    updateByUserId(newSettings: server.Settings, userId: string): server.Settings {
        const i = getDb().settings.findIndex(s => s.userId === userId);
        if (i === -1) {
            return null;
        } else {
            Object.assign(getDb().settings[i], newSettings);
            saveDb();
            return newSettings;
        }
    }
}

export const settingsApi = new SettingsApi();
