import { Component, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { map } from 'rxjs/operators';

import { BaseItemsService } from 'app/core/base-items.service';
import { CompositeItemsService } from 'app/core/composite-items.service';
import { CompositeItem } from 'server/server.interface';
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

    compositeItemOptions$ = this.compositeItemsService.compositeItems$.pipe(
        map(cis => cis
            .filter(ci => {
                const { id: currentItemId, ingredients } = this.ingCtrl.parent.parent.value;
                const containsCurrentItem = this.containsCurrentItem(ci, currentItemId);
                if (containsCurrentItem) return false;
                const isOneOfTheIngredients = ingredients.some(ing => ci.id === ing.compositeItemId);
                if (isOneOfTheIngredients) return false;
                return true;
            })
            .map(ci => ({
                id: ci.id,
                text: ci.name,
            }))
        ),
    );

    constructor(
        private baseItemsService: BaseItemsService,
        private compositeItemsService: CompositeItemsService,
    ) { }

    get amount() {
        return this.ingCtrl.value.amount;
    }

    get editMode() {
        return this.ingCtrl.value.editMode;
    }

    get itemDescription() {
        if (this.ingCtrl.value.baseItemId) {
            const baseItem = this.baseItemsService.baseItems.find(bi => bi.id === this.ingCtrl.value.baseItemId);
            return baseItem.priceBy === 'weight'
                ? `${baseItem.name} (${baseItem.weight} ${weightUnitMap[baseItem.weightUnit]})`
                : baseItem.name;
        } else if (this.ingCtrl.value.compositeItemId) {
            const compositeItem = this.compositeItemsService.compositeItems.find(ci => ci.id === this.ingCtrl.value.compositeItemId);
            return compositeItem.name;
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

    private containsCurrentItem(compositeItem: CompositeItem, currentItemId: string): boolean {
        if (compositeItem.id === currentItemId) return true;
        return compositeItem.ingredients.some(ing => {
            if (!ing.baseItemId && !ing.compositeItemId) throw new Error('bad ingredient, contains no id');
            if (ing.baseItemId) return false;
            const fullIngredient = this.compositeItemsService.compositeItems.find(ci => ci.id === ing.compositeItemId);
            return this.containsCurrentItem(fullIngredient, currentItemId);
        });
    }
}
