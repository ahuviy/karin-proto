import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';
import { AngularMaterialModule } from 'app/angular-material.module';
import { ItemsRouting } from './compositeitems.routing';
import { CompositeItemsPage } from './compositeitems.page';

@NgModule({
    declarations: [
        CompositeItemsPage,
    ],
    imports: [
        SharedModule,
        AngularMaterialModule,
        ItemsRouting,
    ],
})
export class CompositeItemsModule { }
