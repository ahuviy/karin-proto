import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Material, MOCK_MATERIALS } from './materials.mocks';

@Injectable()
export class MaterialsService {
    private _materials$ = new BehaviorSubject<Material[]>(MOCK_MATERIALS);
    materials$ = this._materials$.asObservable();
    get materials() { return this._materials$.getValue(); }
}
