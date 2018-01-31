import { Component } from '@angular/core';

import { BaseItemsService } from 'app/core/base-items.service';

@Component({
    selector: 'kp-baseitems-page',
    styleUrls: ['./baseitems.page.scss'],
    templateUrl: './baseitems.page.html',
})
export class BaseItemsPage {
    baseItems$ = this.baseItemsService.baseItems$;

    constructor(
        private baseItemsService: BaseItemsService,
    ) { }

    ngOnInit() {
        this.baseItemsService.refresh();
    }
}
