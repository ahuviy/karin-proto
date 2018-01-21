import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { genUniqId } from 'functions/util.functions';
import { Item, MOCK_ITEMS } from './items.mocks';

@Injectable()
export class ItemsService {
    private _items$ = new BehaviorSubject<Item[]>(MOCK_ITEMS);
    items$ = this._items$.asObservable();
    get items() { return this._items$.getValue(); }
}
