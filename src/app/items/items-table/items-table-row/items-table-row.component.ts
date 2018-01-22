import { Component, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Item } from 'app/items/services/items.mocks';
import { ItemsService } from 'app/items/services/items.service';

@Component({
    selector: 'kp-items-table-row',
    styleUrls: ['./items-table-row.component.scss'],
    templateUrl: './items-table-row.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemsTableRowComponent {
    @Input() item: Item;

    form: FormGroup;
    editMode = false;

    constructor(
        private cd: ChangeDetectorRef,
        private fb: FormBuilder,
        private itemsService: ItemsService,
    ) { }

    edit() {
        this.editMode = true;
        this.form = this.fb.group({
            name: this.item.name,
            weight: this.item.weight,
            weightUnit: this.item.weightUnit,
            price: this.item.price,
            category: this.item.category,
        });
        this.cd.markForCheck();
    }

    showInfo() {
        console.log('showing info not implemented');
    }

    cancelEdit() {
        this.editMode = false;
        this.form = undefined;
        this.cd.markForCheck();
    }

    save() {
        const newVal = Object.assign({}, this.item, this.form.value);
        this.itemsService.update(newVal).then(this.cancelEdit.bind(this));
    }

    delete() {
        this.itemsService.delete(this.item.id);
    }
}
