import { Component, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DecimalPipe } from '@angular/common';
import { map } from 'rxjs/operators';

import { Material } from 'app/materials/services/materials.mocks';
import { MaterialsService } from 'app/materials/services/materials.service';
import { SettingsService } from 'app/core/settings.service';
import { Settings } from 'app/core/settings.mocks';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'kp-table-row',
    styleUrls: ['./table-row.component.scss'],
    templateUrl: './table-row.component.html',
})
export class TableRowComponent {
    @Input() set material(mat: Material) {
        this.form = this.fb.group({
            name: mat.name,
            distributorName: mat.distributorName,
            weight: mat.weight,
            weightUnit: mat.weightUnit,
            price: mat.price,
            priceUnit: mat.priceUnit,
        });
    }

    form: FormGroup;
    editMode = false;

    constructor(
        private cd: ChangeDetectorRef,
        private decimal: DecimalPipe,
        private fb: FormBuilder,
        private materialsService: MaterialsService,
        private settingsService: SettingsService,
    ) { }

    get price() {
        return this.form ? `${this.form.value.price} ${this.form.value.priceUnit}` : '';
    }

    priceIncludingVat$ = this.settingsService.settings$.pipe(map(s => {
        if (this.form) {
            const raw = this.form.value.price * (1 + (s.percentVat / 100));
            return `${this.decimal.transform(raw, '1.0-1')} ${this.form.value.priceUnit}`;
        } else {
            return '';
        }
    }));

    showInfo() {
        console.log('showing info for:', this.material);
    }

    edit() {
        this.editMode = !this.editMode;
        this.cd.markForCheck();
    }

    delete() {
        this.materialsService.delete(this.material.id);
    }
}
