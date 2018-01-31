import { NgModule } from '@angular/core';
import { MatIconModule, MatButtonModule, MatDialogModule, MatInputModule, MatExpansionModule } from '@angular/material';

@NgModule({
    imports: [
        MatIconModule,
        MatButtonModule,
        MatDialogModule,
        MatInputModule,
        MatExpansionModule,
    ],
    exports: [
        MatIconModule,
        MatButtonModule,
        MatDialogModule,
        MatInputModule,
        MatExpansionModule,
    ],
})
export class AngularMaterialModule { }
