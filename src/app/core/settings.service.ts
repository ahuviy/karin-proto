import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { api, Settings } from 'server';

@Injectable()
export class SettingsService {
    private _settings$ = new BehaviorSubject<Settings>(null);
    readonly settings$ = this._settings$.asObservable();
    get settings() { return this._settings$.getValue(); }

    refresh() {
        api.settings.get().then(res => {
            this._settings$.next(res);
        });
    }

    update(updated: Partial<Settings>): Promise<Settings> {
        return new Promise((resolve, reject) => {
            const toUpdate = Object.assign({}, this.settings, updated);
            api.settings.update(toUpdate).then(res => {
                this._settings$.next(res);
                resolve(res);
            }, reject);
        });
    }
}
