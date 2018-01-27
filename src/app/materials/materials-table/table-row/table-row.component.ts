import { Component, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DecimalPipe } from '@angular/common';
import { map, combineLatest } from 'rxjs/operators';

import { BaseItemsService } from 'app/core/base-items.service';
import { SettingsService } from 'app/core/settings.service';
import { BaseItem } from 'server/server.interface';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'kp-table-row',
    styleUrls: ['./table-row.component.scss'],
    templateUrl: './table-row.component.html',
})
export class TableRowComponent {
    @Input() material: BaseItem;

    form: FormGroup;
    editMode = false;

    constructor(
        private cd: ChangeDetectorRef,
        private decimal: DecimalPipe,
        private fb: FormBuilder,
        private BaseItemsService: BaseItemsService,
        private settingsService: SettingsService,
    ) { }

    get price() {
        return `${this.material.price} ש״ח`;
    }

    priceIncludingVat$ = this.settingsService.settings$.pipe(
        combineLatest(this.BaseItemsService.baseItems$),
        map(([s, ms]) => {
            const mat = ms.find(m => m.id === this.material.id);
            const raw = mat.price * (1 + (s.percentVat / 100));
            return `${this.decimal.transform(raw, '1.0-1')} ש״ח`;
        }),
    );

    showInfo() {
        console.log('showing info not implemented');
    }

    edit() {
        this.editMode = true;
        this.form = this.fb.group({
            name: this.material.name,
            distributorName: this.material.distributorId,
            weight: this.material.weight,
            weightUnit: this.material.weightUnit,
            price: this.material.price,
        });
        this.cd.markForCheck();
    }

    cancelEdit() {
        this.editMode = false;
        this.form = undefined;
        this.cd.markForCheck();
    }

    save() {
        const newVal = Object.assign({}, this.material, this.form.value);
        this.BaseItemsService.update(newVal).then(this.cancelEdit.bind(this));
    }

    delete() {
        this.BaseItemsService.delete(this.material.id);
    }
}
