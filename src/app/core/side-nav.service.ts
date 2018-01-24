import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class SideNavService {
    private _isOpen$ = new BehaviorSubject<boolean>(true);
    readonly isOpen$ = this._isOpen$.asObservable();
    get isOpen() { return this._isOpen$.getValue(); }

    toggle() {
        this._isOpen$.next(!this.isOpen);
    }
}
