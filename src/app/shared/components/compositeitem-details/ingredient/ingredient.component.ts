import { Component, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { map } from 'rxjs/operators';

import { BaseItemsService } from 'app/core/base-items.service';
import { BaseItem } from 'server/server.interface';
import { weightUnitMap } from 'constants/weight.consts';

@Component({
    selector: 'kp-ingredient',
    styleUrls: ['./ingredient.component.scss'],
    templateUrl: './ingredient.component.html'
})
export class IngredientComponent {
    @Input() ingCtrl: FormGroup;

    @Output() delete = new EventEmitter();

    @ViewChild('amountInput') amountInput: ElementRef;

    baseItemOptions$ = this.baseItemsService.baseItems$.pipe(
        map(bis => bis.map(bi => {
            const { id, name, weight, weightUnit, priceBy } = bi;
            const text = priceBy === 'weight'
                ? `${name} (${weight} ${weightUnitMap[weightUnit]})`
                : name;
            return { id, text };
        })),
    );

    constructor(private baseItemsService: BaseItemsService) { }

    get amount() {
        return this.ingCtrl.value.amount;
    }

    get editMode() {
        return this.ingCtrl.value.editMode;
    }

    get baseItemDescription() {
        if (this.ingCtrl.value.baseItemId) {
            const baseItem = this.baseItemsService.baseItems.find(bi => bi.id === this.ingCtrl.value.baseItemId);
            return baseItem.priceBy === 'weight'
                ? `${baseItem.name} (${baseItem.weight} ${weightUnitMap[baseItem.weightUnit]})`
                : baseItem.name;
        } else {
            return '';
        }
    }

    toggleEdit() {
        const editModeCtrl = this.ingCtrl.get('editMode');
        editModeCtrl.setValue(!editModeCtrl.value);
        if (editModeCtrl.value) {
            setTimeout(() => this.amountInput.nativeElement.focus(), 0);
        }
    }
}
