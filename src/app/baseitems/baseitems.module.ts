import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';
import { AngularMaterialModule } from 'app/angular-material.module';
import { BaseItemsRouting } from './baseitems.routing';
import { BaseItemsPage } from './baseitems.page';
import { BaseItemsService } from 'app/core/base-items.service';
import { BaseItemsEntryComponent } from './baseitems-entry/baseitems-entry.component';

@NgModule({
    declarations: [
        BaseItemsPage,
        BaseItemsEntryComponent,
    ],
    imports: [
        SharedModule,
        AngularMaterialModule,
        BaseItemsRouting,
    ],
    providers: [
        BaseItemsService,
    ],
})
export class BaseCompositeItemsModule { }
