import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AngularMaterialModule } from 'app/angular-material.module';
import { DisappearingScrollDirective } from './directives/disappearingScroll.directive';
import { ClickOutsideDirective } from './directives/click-outside.directive';
import { ModalComponent } from './components/modal/modal.component';
import { WeightUnitPipe } from './pipes/weight-unit.pipe';
import { IdToItemCategoryPipe } from './pipes/id-to-item-category.pipe';
import { IdToBaseItemPipe } from './pipes/id-to-baseitem.pipe';
import { IdToCompositeItemPipe } from './pipes/id-to-compositeitem.pipe';
import { ItemTypePipe } from './pipes/item-type.pipe';
import { AlertDialog } from './components/alert/alert.dialog';
import { BaseItemDetailsComponent } from './components/baseitem-details/baseitem-details.component';
import { CompositeItemDetailsComponent } from './components/compositeitem-details/compositeitem-details.component';
import { IngredientComponent } from './components/compositeitem-details/ingredient/ingredient.component';
import { ItemAutocompleteComponent } from './components/item-autocomplete/item-autocomplete.component';

@NgModule({
    declarations: [
        DisappearingScrollDirective,
        ClickOutsideDirective,
        ModalComponent,
        WeightUnitPipe,
        IdToItemCategoryPipe,
        IdToBaseItemPipe,
        IdToCompositeItemPipe,
        ItemTypePipe,
        ItemAutocompleteComponent,
        AlertDialog,
        BaseItemDetailsComponent,
        CompositeItemDetailsComponent,
        IngredientComponent,
    ],
    entryComponents: [
        AlertDialog,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        AngularMaterialModule,
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        AngularMaterialModule,
        DisappearingScrollDirective,
        ClickOutsideDirective,
        ModalComponent,
        WeightUnitPipe,
        IdToItemCategoryPipe,
        IdToBaseItemPipe,
        IdToCompositeItemPipe,
        ItemTypePipe,
        ItemAutocompleteComponent,
        AlertDialog,
        BaseItemDetailsComponent,
        CompositeItemDetailsComponent,
        IngredientComponent,
    ],
})
export class SharedModule { }
