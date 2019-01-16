import { Component, Input, SimpleChanges } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { map } from 'rxjs/operators';

import { AlertDialog } from 'app/shared/components/alert/alert.dialog';
import { CompositeItemsService } from 'app/core/composite-items.service';
import { ItemCategoriesService } from 'app/core/item-categories.service';
import { CompositeItem } from 'server/server.interface';

@Component({
    selector: 'kp-compositeitem-details',
    styleUrls: ['./compositeitem-details.component.scss'],
    templateUrl: './compositeitem-details.component.html'
})
export class CompositeItemDetailsComponent {
    @Input() set compItem(val: CompositeItem) {
        this.form = this.fb.group({
            id: val.id,
            name: val.name,
            hoursOfWork: val.hoursOfWork,
            itemCategoryId: val.itemCategoryId,
            ingredients: this.fb.array(val.ingredients.map(i => this.fb.group({
                baseItemId: i.baseItemId,
                compositeItemId: i.compositeItemId,
                amount: i.amount,
                editMode: false,
            })))
        });
    }

    form: FormGroup;

    itemCategoryOptions$ = this.itemCategoriesService.itemCategories$.pipe(
        map(ics => {
            const nullCategory = { id: undefined, text: '' };
            return ics
                ? [nullCategory].concat(ics.map(ic => ({ id: ic.id, text: ic.name })))
                : [nullCategory];
        })
    );

    constructor(
        private dialog: MatDialog,
        private compositeItemsService: CompositeItemsService,
        private itemCategoriesService: ItemCategoriesService,
        private fb: FormBuilder,
    ) { }

    get ingredients(): FormArray { return this.form.get('ingredients') as FormArray; }

    update() {
        this.compositeItemsService.update(this.form.value).then(res => {
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
            this.compositeItemsService.delete(this.form.value.id).then(res => {
                console.log('success:', res);
            }, err => {
                console.log('failed:', err);
            });
        });
    }

    remIngredient(i: number) {
        const ingredients = this.form.get('ingredients') as FormArray;
        ingredients.removeAt(i);
        ingredients.markAsDirty();
    }

    addIngredient() {
        const ingredients = this.form.get('ingredients') as FormArray;
        ingredients.push(this.fb.group({
            baseItemId: null,
            compositeItemId: null,
            amount: [null, Validators.required],
            editMode: true,
        }, { validator: requiredBaseItemOrCompositeItemId }));
    }
}

function requiredBaseItemOrCompositeItemId(group: FormGroup) {
    const { baseItemId, compositeItemId } = group.value;
    return (baseItemId || compositeItemId) ? null : { requiredId: true };
}
