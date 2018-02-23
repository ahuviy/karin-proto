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
import { BaseItem } from 'server/server.interface';

@Component({
    selector: 'kp-baseitem-details',
    styleUrls: ['./baseitem-details.component.scss'],
    templateUrl: './baseitem-details.component.html'
})
export class BaseItemDetailsComponent {
    @Input() set baseItem(val: BaseItem) {
        this._baseItem = val;
        this.form = this.fb.group(val);
    }

    _baseItem: BaseItem;
    form: FormGroup;
    currencySymbol$ = this.settingsService.settings$.pipe(map(s => s.currency.symbol));
    category$ = this.itemCategoriesService.itemCategories$.pipe(
        map(ics => {
            const category = ics.find(ic => ic.id === this.form.value.itemCategoryId);
            return category ? category.name : '';
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
            this.baseItemsService.delete(this.form.value.id).then(res => {
                console.log('success:', res);
            }, err => {
                console.log('failed:', err);
                if (err.type === 'USED_BY_COMPOSITE_ITEMS') {
                    this.dialog.open(AlertDialog, {
                        direction: 'rtl',
                        data: {
                            title: 'הפעולה נכשלה',
                            message: `בחומר הגלם הזה משתמשים ${err.params.usedByCompositeItemIds.length} פריטים. נא למחוק אותם לפני שניתן למחוק את חומר הגלם.`,
                            confirmBtn: 'אישור',
                        },
                    });
                }
            });
        });
    }
}
