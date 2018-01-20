import { NgModule, Optional, SkipSelf } from '@angular/core';
import { DecimalPipe } from '@angular/common';

import { SettingsService } from './settings.service';

@NgModule({
    providers: [
        DecimalPipe,
        SettingsService,
    ]
})
export class CoreModule {
    constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
        if (parentModule) {
            throw new Error('CoreModule is already loaded. Import it in the AppModule only');
        }
    }
}
