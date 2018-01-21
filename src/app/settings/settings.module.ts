import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';
import { SettingsRouting } from './settings.routing';
import { SettingsPage } from './settings.page';

@NgModule({
    declarations: [
        SettingsPage,
    ],
    imports: [
        SharedModule,
        SettingsRouting,
    ],
})
export class SettingsModule { }
