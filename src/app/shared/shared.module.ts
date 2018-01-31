import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DisappearingScrollDirective } from './directives/disappearingScroll.directive';
import { ModalComponent } from './components/modal/modal.component';
import { WeightUnitPipe } from './pipes/weight-unit.pipe';

@NgModule({
    declarations: [
        DisappearingScrollDirective,
        ModalComponent,
        WeightUnitPipe,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        DisappearingScrollDirective,
        ModalComponent,
        WeightUnitPipe,
    ],
})
export class SharedModule { }
