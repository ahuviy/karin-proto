import { Component } from '@angular/core';

import { BaseItemsService } from 'app/core/base-items.service';

@Component({
    selector: 'kp-materials-page',
    styleUrls: ['./materials.page.scss'],
    templateUrl: './materials.page.html',
    providers: [BaseItemsService],
})
export class MaterialsPage {
    // TODO: add searchbar
}
