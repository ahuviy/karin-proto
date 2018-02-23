import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';
import { CompositeItemsPage } from './compositeitems.page';

@NgModule({
    declarations: [
        CompositeItemsPage,
    ],
    imports: [
        SharedModule,
    ],
    exports: [
        CompositeItemsPage,
    ],
})
export class CompositeItemsModule { }
