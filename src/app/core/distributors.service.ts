import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { api, Distributor } from 'server';

@Injectable()
export class DistributorsService {
    private _distributors$ = new BehaviorSubject<Distributor[]>(null);
    readonly distributors$ = this._distributors$.asObservable();
    get distributors() { return this._distributors$.getValue(); }

    refresh() {
        api.distributor.getAll().then(res => {
            this._distributors$.next(res);
        });
    }

    clear() {
        this._distributors$.next(null);
    }

    update(updated: Partial<Distributor>): Promise<Distributor[]> {
        return new Promise((resolve, reject) => {
            const i = this.distributors.findIndex(d => d.id === updated.id);
            const toUpdate = Object.assign({}, this.distributors[i], updated);
            api.distributor.update(toUpdate).then(res => {
                const newDist = this.distributors;
                const i = newDist.findIndex(d => d.id === res.id);
                newDist[i] = res;
                this._distributors$.next(newDist);
                resolve(newDist);
            }, reject);
        });
    }

    create(created: Partial<Distributor>): Promise<Distributor[]> {
        return new Promise((resolve, reject) => {
            api.distributor.create(created).then(res => {
                const newDist = this.distributors.concat(res);
                this._distributors$.next(newDist);
                resolve(newDist);
            }, reject);
        });
    }

    delete(id: string): Promise<Distributor[]> {
        return new Promise((resolve, reject) => {
            api.distributor.delete(id).then(res => {
                if (res.success) {
                    const newDist = this.distributors.filter(d => d.id !== id);
                    this._distributors$.next(newDist);
                    resolve(newDist);
                } else {
                    reject(res.err);
                }
            }, reject);
        });
    }
}
