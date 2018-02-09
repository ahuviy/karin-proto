import { Component, Input, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material';

import { AlertDialog } from 'app/shared/components/alert/alert.dialog';
import { DistributorsService } from 'app/core/distributors.service';
import { Distributor } from 'server/server.interface';

@Component({
    selector: 'kp-distributor-details',
    styleUrls: ['./distributor-details.component.scss'],
    templateUrl: './distributor-details.component.html'
})
export class DistributorDetailsComponent {
    @Input() set dst(val: Distributor) {
        this.form = this.fb.group(val);
    }

    form: FormGroup;

    constructor(
        private dialog: MatDialog,
        private distributorsService: DistributorsService,
        private fb: FormBuilder,
    ) { }

    update() {
        this.distributorsService.update(this.form.value).then(res => {
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
            this.distributorsService.delete(this.form.value.id).then(res => {
                console.log('success:', res);
            }, err => {
                console.log('failed:', err);
                if (err.type === 'CONNECTED_TO_BASE_ITEMS') {
                    this.dialog.open(AlertDialog, {
                        direction: 'rtl',
                        data: {
                            title: 'הפעולה נכשלה',
                            message: `לספק הזה יש ${err.params.connectedToBaseItemIds.length} חומרי גלם. נא למחוק אותם לפני שניתן למחוק את הספק.`,
                            confirmBtn: 'אישור',
                        },
                    });
                }
            });
        });
    }
}
