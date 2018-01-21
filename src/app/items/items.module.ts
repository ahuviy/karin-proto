import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';
import { ItemsRouting } from './items.routing';
import { ItemsPage } from './items.page';
import { AddItemComponent } from './add-item/add-item.component';
import { ItemsTableComponent } from './items-table/items-table.component';
import { ItemsTableHeaderComponent } from './items-table/items-table-header/items-table-header.component';
import { ItemsTableRowComponent } from './items-table/items-table-row/items-table-row.component';
import { ItemsService } from './services/items.service';

@NgModule({
    declarations: [
        ItemsPage,
        AddItemComponent,
        ItemsTableComponent,
        ItemsTableHeaderComponent,
        ItemsTableRowComponent,
    ],
    imports: [
        SharedModule,
        ItemsRouting,
    ],
    providers: [
        ItemsService,
    ],
})
export class ItemsModule { }
