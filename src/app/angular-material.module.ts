import { NgModule } from '@angular/core';
import { MatTooltipModule, MatAutocompleteModule, MatIconModule, MatSelectModule, MatButtonModule, MatDialogModule, MatInputModule, MatExpansionModule } from '@angular/material';

@NgModule({
    imports: [
        MatIconModule,
        MatAutocompleteModule,
        MatButtonModule,
        MatDialogModule,
        MatInputModule,
        MatExpansionModule,
        MatSelectModule,
        MatTooltipModule,
    ],
    exports: [
        MatIconModule,
        MatAutocompleteModule,
        MatButtonModule,
        MatDialogModule,
        MatInputModule,
        MatExpansionModule,
        MatSelectModule,
        MatTooltipModule,
    ],
})
export class AngularMaterialModule { }
