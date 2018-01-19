import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Material, MOCK_MATERIALS } from './materials.mocks';
import { genUniqId, getPriceIncludingVat } from 'functions/util.functions';

@Injectable()
export class MaterialsService {
    private _materials$ = new BehaviorSubject<Material[]>(MOCK_MATERIALS);
    materials$ = this._materials$.asObservable();
    get materials() { return this._materials$.getValue(); }

    add(material: {
        name: string;
        distributorName: string;
        weight: number;
        weightUnit: string;
        price: number;
    }): Promise<any> {
        const newMaterials = this.materials.concat(Object.assign({
            id: genUniqId(this.materials.map(m => m.id)),
            distributorId: genUniqId(this.materials.map(m => m.distributorId)),
            priceIncludingVat: getPriceIncludingVat(material.price),
            priceUnit: 'ש״ח',
        }, material));
        this._materials$.next(newMaterials);
        return Promise.resolve();
    }

    delete(id: string): Promise<any> {
        this._materials$.next(this.materials.filter(m => m.id !== id));
        return Promise.resolve();
    }
}
