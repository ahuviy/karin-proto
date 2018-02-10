import { Component } from '@angular/core';
import { map } from 'rxjs/operators';

import { CompositeItemsService } from 'app/core/composite-items.service';
import { BaseItemsService } from 'app/core/base-items.service';

@Component({
    selector: 'kp-compositeitems-page',
    styleUrls: ['./compositeitems.page.scss'],
    templateUrl: './compositeitems.page.html'
})
export class CompositeItemsPage {
    compositeItems$ = this.compositeItemsService.compositeItems$.pipe(
        map(cis => cis || []),
    );

    constructor(
        private baseItemsService: BaseItemsService,
        private compositeItemsService: CompositeItemsService,
    ) { }

    ngOnInit() {
        this.compositeItemsService.refresh();
        this.baseItemsService.refresh();
    }
}
