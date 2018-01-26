import { Component, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

import { SettingsService } from 'app/core/settings.service';

@Component({
    selector: 'kp-settings-page',
    styleUrls: ['./settings.page.scss'],
    templateUrl: './settings.page.html'
})
export class SettingsPage {
    @Output() saved = new EventEmitter();

    vatCtrl: FormControl;
    subs = [];
    tabs = [
        { id: 'money', text: 'כספים', isActive: true },
        { id: 'time', text: 'זמנים', isActive: false },
    ];

    constructor(private settingsService: SettingsService) { }

    ngOnInit() {
        this.subs.push(this.settingsService.settings$.subscribe(s => {
            this.vatCtrl = new FormControl(s.percentVat);
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
