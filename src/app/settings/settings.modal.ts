import { Component, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

import { SettingsService } from 'app/core/settings.service';

@Component({
    selector: 'kp-settings-modal',
    styleUrls: ['./settings.modal.scss'],
    templateUrl: './settings.modal.html'
})
export class SettingsModal {
    @Output() saved = new EventEmitter();

    vatCtrl = new FormControl(null);
    subs = [];
    tabs = [
        { id: 'money', text: 'כספים', isActive: true },
        { id: 'time', text: 'זמנים', isActive: false },
    ];

    constructor(private settingsService: SettingsService) { }

    ngOnInit() {
        this.settingsService.refresh();
        this.subs.push(this.settingsService.settings$.subscribe(s => {
            if (s) {
                this.vatCtrl.patchValue(s.percentVat);
            }
        }));
    }

    ngOnDestroy() {
        this.subs.forEach(s => s.unsubscribe());
    }

    save() {
        this.settingsService.update({
            percentVat: this.vatCtrl.value
        }).then(() => {
            this.saved.emit();
        });
    }

    selectTab(tab) {
        this.tabs.forEach(t => t.isActive = (tab.id === t.id));
    }
}
