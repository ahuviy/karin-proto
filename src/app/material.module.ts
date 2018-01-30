import { NgModule } from '@angular/core';
import { MatIconModule, MatButtonModule, MatDialogModule, MatInputModule } from '@angular/material';

@NgModule({
    imports: [
        MatIconModule,
        MatButtonModule,
        MatDialogModule,
        MatInputModule,
    ],
    exports: [
        MatIconModule,
        MatButtonModule,
        MatDialogModule,
        MatInputModule,
    ],
})
export class MaterialModule { }
