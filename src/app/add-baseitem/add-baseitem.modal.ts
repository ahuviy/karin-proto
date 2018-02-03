import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { BaseItemsService } from 'app/core/base-items.service';

@Component({
    selector: 'kp-add-baseitem',
    styleUrls: ['./add-baseitem.modal.scss'],
    templateUrl: './add-baseitem.modal.html',
})
export class AddBaseItemModal {
    tabs = [
        { id: 'material', text: 'חומר גלם', isActive: true },
        { id: 'composite', text: 'פריט יצור', isActive: false },
    ];
    addForm: FormGroup = this.initForm('material');
    formCfg = [
        { label: 'שם', ctrlKey: 'name', inputType: 'text' },
        { label: 'ספק', ctrlKey: 'distributorName', inputType: 'text' },
        { label: 'משקל', ctrlKey: 'weight', inputType: 'number' },
        { label: 'יח׳ משקל', ctrlKey: 'weightUnit', inputType: 'text' },
        { label: 'מחיר בש״ח', ctrlKey: 'price', inputType: 'number' },
    ];

    constructor(
        private fb: FormBuilder,
        private BaseItemsService: BaseItemsService,
        private route: ActivatedRoute,
        private router: Router,
        private dialogRef: MatDialogRef<AddBaseItemModal>,
        @Inject(MAT_DIALOG_DATA) private data: any,
    ) { }

    add() {
        this.BaseItemsService.add(this.addForm.value).then(() => {
            this.router.navigate(['..'], { relativeTo: this.route });
        });
    }

    close() {
        this.dialogRef.close();
    }

    selectTab(tab) {
        this.tabs.forEach(t => t.isActive = (tab.id === t.id));
        this.addForm = this.initForm(tab.id);
    }

    initForm(type) {
        switch (type) {
            case 'material':
                return this.initMaterialForm();
            case 'composite':
                return this.initCompositeForm();
        }
    }

    private initMaterialForm() {
        return this.fb.group({
            name: [null, Validators.required],
            distributorName: [null, Validators.required],
            weight: [null, Validators.required],
            weightUnit: [null, Validators.required],
            price: [null, Validators.required],
        });
    }

    private initCompositeForm() {
        return this.fb.group({
            name: [null, Validators.required],
            distributorName: [null, Validators.required],
            weight: [null, Validators.required],
            weightUnit: [null, Validators.required],
            price: [null, Validators.required],
        });
    }
}
