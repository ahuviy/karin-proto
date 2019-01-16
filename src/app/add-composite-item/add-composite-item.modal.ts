import { Component, Inject } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { map, startWith } from 'rxjs/operators';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { Observable } from 'rxjs/Observable';

import { BaseItemsService } from 'app/core/base-items.service';
import { CompositeItemsService } from 'app/core/composite-items.service';
import { SettingsService } from 'app/core/settings.service';
import { DistributorsService } from 'app/core/distributors.service';
import { ItemCategoriesService } from 'app/core/item-categories.service';
import { weightUnitMap } from 'constants/weight.consts';
import { ItemAutocompleteOption } from 'app/shared/components/item-autocomplete/item-autocomplete.component';

@Component({
    selector: 'kp-add-composite-item',
    styleUrls: ['./add-composite-item.modal.scss'],
    templateUrl: './add-composite-item.modal.html',
})
export class AddCompositeItemModal {
    // TODO: composite item ingredients should be added by gram/kilogram amounts
    itemCategoryOptions$ = this.itemCategoriesService.itemCategories$.pipe(
        map(ics => {
            const nullCategory = { id: undefined, text: '' };
            const options = ics
                ? [nullCategory].concat(ics.map(ic => ({ id: ic.id, text: ic.name })))
                : [nullCategory];
            return options;
        })
    );

    currencySymbol$ = this.settingsService.settings$.pipe(
        map(s => s.currency.symbol)
    );

    distributorOptions$ = this.distributorsService.distributors$.pipe(
        map(ds => ds ? ds.map(d => ({ id: d.id, text: d.name })) : [])
    );

    form: FormGroup = this.fb.group({
        name: [null, Validators.required],
        hoursOfWork: [null, Validators.required],
        ingredients: this.fb.array([]),
        itemCategoryId: null,
    });

    ingredients = [];

    constructor(
        private fb: FormBuilder,
        private baseItemsService: BaseItemsService,
        private distributorsService: DistributorsService,
        private itemCategoriesService: ItemCategoriesService,
        private settingsService: SettingsService,
        private dialogRef: MatDialogRef<AddCompositeItemModal>,
        private compositeItemsService: CompositeItemsService,
        @Inject(MAT_DIALOG_DATA) private data: any,
    ) { }

    get ingredientsFormArray(): FormArray { return this.form.get('ingredients') as FormArray; }

    onItemSelected(opt: ItemAutocompleteOption) {
        (this.form.get('ingredients') as FormArray).push(this.fb.group({
            baseItemId: (opt.type === 'baseItem') ? opt.item.id : null,
            compositeItemId: (opt.type === 'compositeItem') ? opt.item.id : null,
            amount: [null, Validators.required],
        }));
        this.ingredients.push({ label: this.getIngredientLabel(opt) });
    }

    close() {
        this.dialogRef.close();
    }

    add() {
        if (this.form.invalid) {
            return;
        }
        this.compositeItemsService.add(this.form.value).then(res => {
            this.dialogRef.close('success');
        }, err => {
            console.log('failure:', err);
        });
    }

    removeIngredient(index: number) {
        (this.form.get('ingredients') as FormArray).removeAt(index);
        this.ingredients.splice(index, 1);
    }

    private getIngredientLabel(opt: ItemAutocompleteOption): string {
        if (opt.type === 'baseItem') {
            const baseItem = this.baseItemsService.baseItems
                .find(bi => bi.id === opt.item.id);
            const parenthesis = (baseItem.priceBy === 'package')
                ? 'אריזה' : `${baseItem.weight} ${weightUnitMap[baseItem.weightUnit]}`;
            return `${baseItem.name} (${parenthesis})`;
        } else {
            const compositeItem = this.compositeItemsService.compositeItems
                .find(ci => ci.id === opt.item.id);
            return compositeItem.name;
        }
    }
}
