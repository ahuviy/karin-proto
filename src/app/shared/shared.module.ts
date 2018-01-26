import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DisappearingScrollDirective } from './directives/disappearingScroll.directive';
import { ModalComponent } from './components/modal/modal.component';

@NgModule({
    declarations: [
        DisappearingScrollDirective,
        ModalComponent,
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
    ],
})
export class SharedModule { }
