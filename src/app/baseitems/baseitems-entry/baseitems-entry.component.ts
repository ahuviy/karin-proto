import { Component, Input } from '@angular/core';
import { map } from 'rxjs/operators';
import { combineLatest } from 'rxjs/observable/combineLatest';

import { BaseItemsService } from 'app/core/base-items.service';
import { SettingsService } from 'app/core/settings.service';
import { DistributorsService } from 'app/core/distributors.service';
import { ItemCategoriesService } from 'app/core/item-categories.service';
import * as server from 'server/server.interface';

@Component({
    selector: 'kp-baseitems-entry',
    styleUrls: ['./baseitems-entry.component.scss'],
    templateUrl: './baseitems-entry.component.html',
})
export class BaseItemsEntryComponent {
    @Input() baseItem: server.BaseItem;

    currencySymbol$ = this.settingsService.settings$.pipe(map(s => s.currency.symbol));
    category$ = this.itemCategoriesService.itemCategories$.pipe(map(ics => {
        const category = ics.find(ic => ic.id === this.baseItem.itemCategoryId);
        return category ? category.name : 'מסות'; // TODO: temp, change this to empty string
    }));
    distributorName$ = this.distributorsService.distributors$.pipe(map(ds => {
        const dist = ds.find(d => d.id === this.baseItem.distributorId);
        return dist ? dist.name : '';
    }));
    
    constructor(
        private baseItemsService: BaseItemsService,
        private distributorsService: DistributorsService,
        private itemCategoriesService: ItemCategoriesService,
        private settingsService: SettingsService,
    ) { }
}
