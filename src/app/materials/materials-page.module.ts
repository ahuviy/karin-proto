import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';
import { MaterialsPage } from './materials.page';
import { TableHeaderComponent } from './table-header/table-header.component';
import { TableRowComponent } from './table-row/table-row.component';
import { MaterialsService } from './services/materials.service';

@NgModule({
    declarations: [
        MaterialsPage,
        TableHeaderComponent,
        TableRowComponent,
    ],
    imports: [
        SharedModule,
    ],
    providers: [
        MaterialsService,
    ],
    exports: [
        MaterialsPage,
    ],
})
export class MaterialsPageModule { }
