import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { SettingsService } from 'app/core/settings.service';

@Component({
    selector: 'kp-settings-modal',
    styleUrls: ['./settings.modal.scss'],
    templateUrl: './settings.modal.html'
})
export class SettingsModal {
    form: FormGroup = this.fb.group({
        percentVat: [null, Validators.required],
        workCostPerHour: [null, Validators.required],
    });
    subs = [];
    tabs = [
        { id: 'money', text: 'כספים', isActive: true },
    ];

    constructor(
        private fb: FormBuilder,
        private settingsService: SettingsService,
        private dialogRef: MatDialogRef<SettingsModal>,
        @Inject(MAT_DIALOG_DATA) private data: any,
    ) { }

    ngOnInit() {
        this.settingsService.refresh();
        this.subs.push(this.settingsService.settings$.subscribe(s => {
            if (!s) return;
            this.form.patchValue(s);
            this.form.markAsPristine();
        }));
    }

    ngOnDestroy() {
        this.subs.forEach(s => s.unsubscribe());
    }

    save() {
        this.settingsService.update(this.form.value).then(() => {
            this.dialogRef.close('success');
        });
    }

    selectTab(tab) {
        this.tabs.forEach(t => t.isActive = (tab.id === t.id));
    }
}
