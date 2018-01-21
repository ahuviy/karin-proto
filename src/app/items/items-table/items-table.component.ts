import { Component } from '@angular/core';
import { filter } from 'rxjs/operators';

import { ItemsService } from 'app/items/services/items.service';
import { Item } from 'app/items/services/items.mocks';

@Component({
    selector: 'kp-items-table',
    styleUrls: ['./items-table.component.scss'],
    templateUrl: './items-table.component.html'
})
export class ItemsTableComponent {
    constructor(
        private itemsService: ItemsService,
    ) { }

    items$ = this.itemsService.items$.pipe(filter(i => !!i));

    trackByItems(i: number, item: Item) { return item.id; }
}
