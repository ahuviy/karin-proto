import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';
import { MaterialsRouting } from './materials.routing';
import { MaterialsPage } from './materials.page';
import { MaterialsService } from './services/materials.service';
import { MaterialsTableComponent } from './materials-table/materials-table.component';
import { TableHeaderComponent } from './materials-table/table-header/table-header.component';
import { TableRowComponent } from './materials-table/table-row/table-row.component';
import { AddMaterialComponent } from './add-material/add-material.component';

@NgModule({
    declarations: [
        MaterialsPage,
        MaterialsTableComponent,
        TableHeaderComponent,
        TableRowComponent,
        AddMaterialComponent,
    ],
    imports: [
        SharedModule,
        MaterialsRouting,
    ],
    providers: [
        MaterialsService,
    ],
})
export class MaterialsModule { }
