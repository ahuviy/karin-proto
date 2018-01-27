import { Component } from '@angular/core';
import { filter } from 'rxjs/operators';

import { BaseItemsService } from 'app/core/base-items.service';
import { BaseItem } from 'server/server.interface';

@Component({
    selector: 'kp-materials-table',
    styleUrls: ['./materials-table.component.scss'],
    templateUrl: './materials-table.component.html',
})
export class MaterialsTableComponent {
    constructor(
        private BaseItemsService: BaseItemsService,
    ) { }

    materials$ = this.BaseItemsService.baseItems$.pipe(filter(m => !!m));

    trackByMaterials(i: number, m: BaseItem) { return m.id; }
}
