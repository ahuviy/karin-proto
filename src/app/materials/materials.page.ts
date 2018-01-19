import { Component } from '@angular/core';
import { filter } from 'rxjs/operators';

import { MaterialsService } from './services/materials.service';

@Component({
    selector: 'kp-materials-page',
    styleUrls: ['./materials.page.scss'],
    templateUrl: './materials.page.html',
})
export class MaterialsPage {
    constructor(
        private materialsService: MaterialsService,
    ) { }

    materials$ = this.materialsService.materials$.pipe(filter(m => !!m));
}
