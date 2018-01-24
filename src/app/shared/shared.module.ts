import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DisappearingScrollDirective } from './directives/disappearingScroll.directive';

@NgModule({
    declarations: [
        DisappearingScrollDirective,
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
    ],
})
export class SharedModule { }
