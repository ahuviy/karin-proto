import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { map } from 'rxjs/operators';

import { BaseItemsService } from 'app/core/base-items.service';
import { SettingsService } from 'app/core/settings.service';
import { DistributorsService } from 'app/core/distributors.service';
import { ItemCategoriesService } from 'app/core/item-categories.service';

@Component({
    selector: 'kp-add-distributor',
    styleUrls: ['./add-distributor.modal.scss'],
    templateUrl: './add-distributor.modal.html',
})
export class AddDistributorModal {
    form: FormGroup = this.fb.group({
        name: [null, Validators.required],
        phoneNumber: [null, Validators.required],
    });

    constructor(
        private fb: FormBuilder,
        private distributorsService: DistributorsService,
        private dialogRef: MatDialogRef<AddDistributorModal>,
        @Inject(MAT_DIALOG_DATA) private data: any,
    ) { }

    close() {
        this.dialogRef.close();
    }

    add() {
        if (this.form.invalid) {
            return;
        }
        this.distributorsService.create(this.form.value).then(res => {
            this.dialogRef.close('success');
        }, err => {
            console.log('failure:', err);
        });
    }
}
