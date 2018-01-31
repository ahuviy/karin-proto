import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';
import { AngularMaterialModule } from 'app/angular-material.module';
import { BaseItemsRouting } from './baseitems.routing';
import { BaseCompositeItemsPage } from './baseitems.page';

@NgModule({
    declarations: [
        BaseCompositeItemsPage,
    ],
    imports: [
        SharedModule,
        AngularMaterialModule,
        BaseItemsRouting,
    ],
})
export class BaseCompositeItemsModule { }
