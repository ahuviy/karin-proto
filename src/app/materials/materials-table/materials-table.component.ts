import { Component } from '@angular/core';
import { filter } from 'rxjs/operators';

import { MaterialsService } from 'app/core/materials.service';
import { Material } from 'app/core/materials.mocks';

@Component({
    selector: 'kp-materials-table',
    styleUrls: ['./materials-table.component.scss'],
    templateUrl: './materials-table.component.html',
})
export class MaterialsTableComponent {
    constructor(
        private materialsService: MaterialsService,
    ) { }

    materials$ = this.materialsService.materials$.pipe(filter(m => !!m));

    trackByMaterials(i: number, m: Material) { return m.id; }
}
