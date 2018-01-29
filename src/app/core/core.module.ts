import { NgModule, Optional, SkipSelf } from '@angular/core';
import { DecimalPipe } from '@angular/common';

import { SideNavService } from './side-nav.service';
import { AddItemService } from './add-item.service';
import { UserService } from './user.service';
import { SettingsService } from './settings.service';
import { DistributorsService } from './distributors.service';
import { BaseItemsService } from './base-items.service';
import { CompositeItemsService } from './composite-items.service';
import { ItemCategoriesService } from './item-categories.service';

@NgModule({
    providers: [
        DecimalPipe,
        SideNavService,
        AddItemService,
        UserService,
        SettingsService,
        DistributorsService,
        BaseItemsService,
        CompositeItemsService,
        ItemCategoriesService,
    ]
})
export class CoreModule {
    constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
        if (parentModule) {
            throw new Error('CoreModule is already loaded. Import it in the AppModule only');
        }
    }
}
