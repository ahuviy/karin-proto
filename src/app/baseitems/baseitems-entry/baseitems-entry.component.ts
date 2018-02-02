import { Component, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { map, shareReplay } from 'rxjs/operators';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { MatDialog } from '@angular/material';

import { BaseItemsService } from 'app/core/base-items.service';
import { SettingsService } from 'app/core/settings.service';
import { DistributorsService } from 'app/core/distributors.service';
import { ItemCategoriesService } from 'app/core/item-categories.service';
import { AlertDialog } from 'app/shared/components/alert/alert.dialog';
import * as server from 'server/server.interface';

@Component({
    selector: 'kp-baseitems-entry',
    styleUrls: ['./baseitems-entry.component.scss'],
    templateUrl: './baseitems-entry.component.html',
})
export class BaseItemsEntryComponent {
    @Input() set baseItem(val: server.BaseItem) {
        this._baseItem = val;
        this.form = this.fb.group(val);
    }

    _baseItem: server.BaseItem;
    form: FormGroup;
    currencySymbol$ = this.settingsService.settings$.pipe(map(s => s.currency.symbol));
    category$ = this.itemCategoriesService.itemCategories$.pipe(
        map(ics => {
            const category = ics.find(ic => ic.id === this.form.value.itemCategoryId);
            return category ? category.name : 'מסות'; // TODO: temp, change this to empty string
        }),
        shareReplay(1),
    );
    distributorName$ = this.distributorsService.distributors$.pipe(map(ds => {
        const dist = ds.find(d => d.id === this.form.value.distributorId);
        return dist ? dist.name : '';
    }));
    distributorOptions$ = this.distributorsService.distributors$.pipe(
        map(ds => ds ? ds.map(d => ({ id: d.id, text: d.name })) : [])
    );
    itemCategoryOptions$ = this.itemCategoriesService.itemCategories$.pipe(
        map(ics => {
            const nullCategory = { id: undefined, text: '' };
            if (ics) {
                return [nullCategory].concat(ics.map(ic => ({ id: ic.id, text: ic.name })));
            } else {
                return [nullCategory];
            }
        })
    );

    constructor(
        private baseItemsService: BaseItemsService,
        private dialog: MatDialog,
        private distributorsService: DistributorsService,
        private fb: FormBuilder,
        private itemCategoriesService: ItemCategoriesService,
        private settingsService: SettingsService,
    ) { }

    update() {
        this.baseItemsService.update(this.form.value).then(res => {
            console.log('update successful, updated:', res);
        }, err => {
            console.log('update unsuccessful');
        });
    }

    delete() {
        const dialogRef = this.dialog.open(AlertDialog, {
            direction: 'rtl',
            data: {
                title: 'מחיקה',
                message: 'אתה בטוח שאתה רוצה למחוק?',
                cancelBtn: 'ביטול',
                confirmBtn: 'אישור',
            },
        });
        dialogRef.afterClosed().subscribe(confirmed => {
            if (!confirmed) return;
            this.baseItemsService.delete(this.form.value.id);
        });
    }
}
