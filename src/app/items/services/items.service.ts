import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { genUniqId } from 'functions/util.functions';
import { Item, MOCK_ITEMS } from './items.mocks';

@Injectable()
export class ItemsService {
    private _items$ = new BehaviorSubject<Item[]>(MOCK_ITEMS);
    readonly items$ = this._items$.asObservable();
    get items() { return this._items$.getValue(); }

    update(newVal: Item): Promise<Item> {
        const updated = this.items.map(i => (i.id === newVal.id) ? newVal : i);
        this._items$.next(updated);
        return Promise.resolve(newVal);
    }

    delete(id: string): Promise<any> {
        this._items$.next(this.items.filter(i => i.id !== id));
        return Promise.resolve();
    }

    add(item: {
        name: string;
        weight: number;
        weightUnit: string;
        price: number;
        category: string;
    }): Promise<Item> {
        const itemToAdd = Object.assign({
            id: genUniqId(this.items.map(i => i.id)),
        }, item);
        const newItems = this.items.concat(itemToAdd);
        this._items$.next(newItems);
        return Promise.resolve(itemToAdd);
    }
}
