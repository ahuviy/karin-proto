import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { api, User } from 'server';

@Injectable()
export class UserService {
    private _user$ = new BehaviorSubject<User>(null);
    readonly user$ = this._user$.asObservable();
    get user() { return this._user$.getValue(); }

    refresh() {
        api.user.getCurrent().then(res => {
            this._user$.next(res);
        });
    }

    clear() {
        this._user$.next(null);
    }
}
