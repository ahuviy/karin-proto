import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';
import { CompositeItemsPage } from './compositeitems.page';
import { CompositeItemDetailsComponent } from './compositeitem-details/compositeitem-details.component';
import { IngredientComponent } from './compositeitem-details/ingredient/ingredient.component';

@NgModule({
    declarations: [
        CompositeItemsPage,
        CompositeItemDetailsComponent,
        IngredientComponent,
    ],
    imports: [
        SharedModule,
    ],
    exports: [
        CompositeItemsPage,
    ],
})
export class CompositeItemsModule { }
