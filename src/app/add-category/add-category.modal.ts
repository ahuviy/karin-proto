import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, Validators } from '@angular/forms';

import { ItemCategoriesService } from 'app/core/item-categories.service';

@Component({
    selector: 'kp-add-category',
    styleUrls: ['./add-category.modal.scss'],
    templateUrl: './add-category.modal.html',
})
export class AddCategoryModal {
    form = this.fb.group({
        name: ['', [
            Validators.required,
            (ctrl) => {
                const categoryExists = !!this.itemCategoriesService.itemCategories.find(c => {
                    return c.name.trim().toLowerCase() === ctrl.value.trim().toLowerCase()
                });
                return categoryExists ? { categoryExists: true } : null;
            }
        ]]
    });

    constructor(
        private fb: FormBuilder,
        private itemCategoriesService: ItemCategoriesService,
        private dialogRef: MatDialogRef<AddCategoryModal>,
        @Inject(MAT_DIALOG_DATA) private data: any,
    ) { }

    close() {
        this.dialogRef.close();
    }

    submit() {
        this.itemCategoriesService.create(this.form.value).then(() => {
            this.close();
        });
    }
}
