import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { ItemsService } from 'app/items/services/items.service';

@Component({
    selector: 'kp-add-item',
    styleUrls: ['./add-item.component.scss'],
    templateUrl: './add-item.component.html'
})
export class AddItemComponent {
    constructor(
        private fb: FormBuilder,
        private itemsService: ItemsService,
        private route: ActivatedRoute,
        private router: Router,
    ) { }

    addForm: FormGroup = this.fb.group({
        name: [null, Validators.required],
        weight: [null, Validators.required],
        weightUnit: [null, Validators.required],
        price: [null, Validators.required],
        category: [null, Validators.required],
    });

    formCfg = [
        { label: 'שם', ctrlKey: 'name', inputType: 'text' },
        { label: 'משקל', ctrlKey: 'weight', inputType: 'number' },
        { label: 'יח׳ משקל', ctrlKey: 'weightUnit', inputType: 'text' },
        { label: 'מחיר בש״ח', ctrlKey: 'price', inputType: 'number' },
        { label: 'קטגוריה', ctrlKey: 'category', inputType: 'text' },
    ];

    add() {
        this.itemsService.add(this.addForm.value).then(() => {
            this.router.navigate(['..'], { relativeTo: this.route });
        });
    }
}
