import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { Material } from '../services/materials.mocks';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'kp-table-row',
    styleUrls: ['./table-row.component.scss'],
    templateUrl: './table-row.component.html',
})
export class TableRowComponent {
    @Input() material: Material;

    get price() { return `${this.material.price} ${this.material.priceUnit}`; }
    get priceIncludingVat() { return `${this.material.priceIncludingVat} ${this.material.priceUnit}`; }
}
