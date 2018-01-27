import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { api, BaseItem } from 'server';

@Injectable()
export class BaseItemsService {
    private _baseItems$ = new BehaviorSubject<BaseItem[]>([]);
    readonly baseItems$ = this._baseItems$.asObservable();
    get baseItems() { return this._baseItems$.getValue(); }

    refresh() {
        api.baseItem.getAll().then(res => {
            this._baseItems$.next(res);
        });
    }

    add(baseItem: BaseItem): Promise<BaseItem> {
        return new Promise((resolve, reject) => {
            api.baseItem.create(baseItem).then(res => {
                this._baseItems$.next(this.baseItems.concat(res));
                resolve(res);
            }, reject);
        });
    }

    delete(id: string): Promise<any> {
        return new Promise((resolve, reject) => {
            api.baseItem.delete(id).then(res => {
                if (res.success) {
                    this._baseItems$.next(this.baseItems.filter(bi => bi.id !== id));
                    resolve();
                } else {
                    reject(res.err);
                }
            }, reject);
        });
    }

    update(updated: BaseItem): Promise<BaseItem> {
        return new Promise((resolve, reject) => {
            api.baseItem.update(updated).then(res => {
                const current = this.baseItems;
                const i = current.findIndex(bi => bi.id === updated.id);
                current[i] = res;
                this._baseItems$.next(current);
                resolve(res);
            }, reject);
        });
    }
}
