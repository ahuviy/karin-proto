import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { api, CompositeItem } from 'server';

@Injectable()
export class CompositeItemsService {
    private _compositeItems$ = new BehaviorSubject<CompositeItem[]>(null);
    readonly compositeItems$ = this._compositeItems$.asObservable();
    get compositeItems() { return this._compositeItems$.getValue(); }

    refresh() {
        api.compositeItem.getAll().then(res => {
            this._compositeItems$.next(res);
        });
    }

    create(created: Partial<CompositeItem>): Promise<CompositeItem[]> {
        return new Promise((resolve, reject) => {
            api.compositeItem.create(created).then(res => {
                const newCompositeItems = this.compositeItems.concat(res);
                this._compositeItems$.next(newCompositeItems);
                resolve(newCompositeItems);
            }, reject);
        });
    }

    delete(id: string): Promise<any> {
        return new Promise((resolve, reject) => {
            api.compositeItem.delete(id).then(res => {
                if (res.success) {
                    this._compositeItems$.next(this.compositeItems.filter(ci => ci.id !== id));
                    resolve();
                } else {
                    reject(res.err);
                }
            }, reject);
        });
    }

    update(updated: Partial<CompositeItem>): Promise<CompositeItem[]> {
        return new Promise((resolve, reject) => {
            api.compositeItem.update(updated).then(res => {
                const current = this.compositeItems;
                const i = current.findIndex(ci => ci.id === updated.id);
                current[i] = res;
                this._compositeItems$.next(current);
                resolve(current);
            }, reject);
        });
    }
}
