import { Component } from '@angular/core';

import { BaseItemsService } from 'app/core/base-items.service';

@Component({
    selector: 'kp-baseitems-page',
    styleUrls: ['./baseitems.page.scss'],
    templateUrl: './baseitems.page.html',
    providers: [BaseItemsService],
})
export class BaseCompositeItemsPage { }
