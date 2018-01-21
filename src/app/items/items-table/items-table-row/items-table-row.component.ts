import { Component, Input } from '@angular/core';

import { Item } from 'app/items/services/items.mocks';

@Component({
    selector: 'kp-items-table-row',
    styleUrls: ['./items-table-row.component.scss'],
    templateUrl: './items-table-row.component.html'
})
export class ItemsTableRowComponent {
    @Input() item: Item;
}
