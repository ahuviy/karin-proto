import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { map } from 'rxjs/operators';

import { BaseItemsService } from 'app/core/base-items.service';
import { SettingsService } from 'app/core/settings.service';
import { DistributorsService } from 'app/core/distributors.service';
import { ItemCategoriesService } from 'app/core/item-categories.service';

@Component({
    selector: 'kp-add-baseitem',
    styleUrls: ['./add-baseitem.modal.scss'],
    templateUrl: './add-baseitem.modal.html',
})
export class AddBaseItemModal {
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
        distributorId: [null, Validators.required],
        name: [null, Validators.required],
        weight: [null, Validators.required],
        weightUnit: 'gram',
        price: [null, Validators.required],
        itemCategoryId: null,
    });

    constructor(
        private fb: FormBuilder,
        private baseItemsService: BaseItemsService,
        private distributorsService: DistributorsService,
        private itemCategoriesService: ItemCategoriesService,
        private settingsService: SettingsService,
        private dialogRef: MatDialogRef<AddBaseItemModal>,
        @Inject(MAT_DIALOG_DATA) private data: any,
    ) { }

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
