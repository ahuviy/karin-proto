import { NgModule, Optional, SkipSelf } from '@angular/core';
import { DecimalPipe } from '@angular/common';

import { SettingsService } from './settings.service';
import { SideNavService } from './side-nav.service';
import { BaseItemsService } from './base-items.service';
import { AddItemService } from './add-item.service';
import { UserService } from './user.service';

@NgModule({
    providers: [
        DecimalPipe,
        SettingsService,
        SideNavService,
        BaseItemsService,
        AddItemService,
        UserService,
    ]
})
export class CoreModule {
    constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
        if (parentModule) {
            throw new Error('CoreModule is already loaded. Import it in the AppModule only');
        }
    }
}
