import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

import { SettingsService } from 'app/core/settings.service';

@Component({
    selector: 'kp-settings-page',
    styleUrls: ['./settings.page.scss'],
    templateUrl: './settings.page.html'
})
export class SettingsPage {
    vatCtrl: FormControl;
    subs = [];

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
        });
    }
}
