import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { map, startWith } from 'rxjs/operators';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { Observable } from 'rxjs/Observable';

import { BaseItemsService } from 'app/core/base-items.service';
import { CompositeItemsService } from 'app/core/composite-items.service';
import { SettingsService } from 'app/core/settings.service';
import { DistributorsService } from 'app/core/distributors.service';
import { ItemCategoriesService } from 'app/core/item-categories.service';
import { BaseItem, CompositeItem } from 'server/server.interface';
import { ItemAutocompleteOption } from 'app/shared/components/item-autocomplete/item-autocomplete.component';

@Component({
    selector: 'kp-add-composite-item',
    styleUrls: ['./add-composite-item.modal.scss'],
    templateUrl: './add-composite-item.modal.html',
})
export class AddCompositeItemModal {
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
        ingredients: null,
        itemCategoryId: null,
    });

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

    onItemSelected(item: ItemAutocompleteOption) {
        console.log('selected item:', item);
    }

    close() {
        this.dialogRef.close();
    }

    add() {
        if (this.form.invalid) {
            return;
        }
        this.baseItemsService.add(this.form.value).then(res => {
            this.dialogRef.close('success');
        }, err => {
            console.log('failure:', err);
        });
    }
}
