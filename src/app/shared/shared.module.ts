import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AngularMaterialModule } from 'app/angular-material.module';
import { DisappearingScrollDirective } from './directives/disappearingScroll.directive';
import { ModalComponent } from './components/modal/modal.component';
import { WeightUnitPipe } from './pipes/weight-unit.pipe';
import { IdToItemCategoryPipe } from './pipes/id-to-item-category.pipe';
import { IdToBaseItemPipe } from './pipes/id-to-baseitem.pipe';
import { AlertDialog } from './components/alert/alert.dialog';

@NgModule({
    declarations: [
        DisappearingScrollDirective,
        ModalComponent,
        WeightUnitPipe,
        IdToItemCategoryPipe,
        IdToBaseItemPipe,
        AlertDialog,
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
        ModalComponent,
        WeightUnitPipe,
        IdToItemCategoryPipe,
        IdToBaseItemPipe,
        AlertDialog,
    ],
})
export class SharedModule { }
