import { NgModule } from '@angular/core';
import { MatTooltipModule, MatIconModule, MatSelectModule, MatButtonModule, MatDialogModule, MatInputModule, MatExpansionModule } from '@angular/material';

@NgModule({
    imports: [
        MatIconModule,
        MatButtonModule,
        MatDialogModule,
        MatInputModule,
        MatExpansionModule,
        MatSelectModule,
        MatTooltipModule,
    ],
    exports: [
        MatIconModule,
        MatButtonModule,
        MatDialogModule,
        MatInputModule,
        MatExpansionModule,
        MatSelectModule,
        MatTooltipModule,
    ],
})
export class AngularMaterialModule { }
