import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { MaterialsService } from 'app/core/materials.service';

@Component({
    selector: 'kp-add-item',
    styleUrls: ['./add-item.modal.scss'],
    templateUrl: './add-item.modal.html',
})
export class AddItemModal {
    constructor(
        private fb: FormBuilder,
        private materialsService: MaterialsService,
        private route: ActivatedRoute,
        private router: Router,
    ) { }

    addForm: FormGroup = this.fb.group({
        name: [null, Validators.required],
        distributorName: [null, Validators.required],
        weight: [null, Validators.required],
        weightUnit: [null, Validators.required],
        price: [null, Validators.required],
    });

    formCfg = [
        { label: 'שם', ctrlKey: 'name', inputType: 'text' },
        { label: 'ספק', ctrlKey: 'distributorName', inputType: 'text' },
        { label: 'משקל', ctrlKey: 'weight', inputType: 'number' },
        { label: 'יח׳ משקל', ctrlKey: 'weightUnit', inputType: 'text' },
        { label: 'מחיר בש״ח', ctrlKey: 'price', inputType: 'number' },
    ];

    add() {
        this.materialsService.add(this.addForm.value).then(() => {
            this.router.navigate(['..'], { relativeTo: this.route });
        });
    }
}
