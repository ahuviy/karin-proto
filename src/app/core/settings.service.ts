import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Settings, MOCK_SETTINGS } from './settings.mocks';

@Injectable()
export class SettingsService {
    private _settings$ = new BehaviorSubject<Settings>(MOCK_SETTINGS);
    settings$ = this._settings$.asObservable();
    get settings() { return this._settings$.getValue(); }
}
