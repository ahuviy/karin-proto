import { NgModule } from '@angular/core';
import { MatTooltipModule, MatRadioModule, MatAutocompleteModule, MatIconModule, MatSelectModule, MatButtonModule, MatDialogModule, MatInputModule, MatExpansionModule } from '@angular/material';

@NgModule({
    imports: [
        MatIconModule,
        MatRadioModule,
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
        MatRadioModule,
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
