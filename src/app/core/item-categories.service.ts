import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { api, ItemCategory } from 'server';

@Injectable()
export class ItemCategoriesService {
    private _itemCategories$ = new BehaviorSubject<ItemCategory[]>(null);
    readonly itemCategories$ = this._itemCategories$.asObservable();
    get itemCategories() { return this._itemCategories$.getValue(); }

    refresh() {
        api.itemCategories.getAll().then(res => {
            this._itemCategories$.next(res);
        });
    }

    create(created: Partial<ItemCategory>): Promise<ItemCategory[]> {
        return new Promise((resolve, reject) => {
            api.itemCategories.create(created).then(res => {
                const newCategories = this.itemCategories.concat(res);
                this._itemCategories$.next(newCategories);
                resolve(newCategories);
            }, reject);
        });
    }

    delete(id: string): Promise<any> {
        return new Promise((resolve, reject) => {
            api.itemCategories.delete(id).then(res => {
                if (res.success) {
                    this._itemCategories$.next(this.itemCategories.filter(ic => ic.id !== id));
                    resolve();
                } else {
                    reject(res.err);
                }
            }, reject);
        });
    }

    update(updated: Partial<ItemCategory>): Promise<ItemCategory[]> {
        return new Promise((resolve, reject) => {
            api.itemCategories.update(updated).then(res => {
                const current = this.itemCategories;
                const i = current.findIndex(ic => ic.id === updated.id);
                current[i] = res;
                this._itemCategories$.next(current);
                resolve(current);
            }, reject);
        });
    }
}
