import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ItemsPage } from './items.page';
import { ItemsTableComponent } from './items-table/items-table.component';
import { AddItemComponent } from './add-item/add-item.component';

const routes: Routes = [
    {
        path: '',
        component: ItemsPage,
        children: [
            { path: 'add', component: AddItemComponent },
            { path: '', component: ItemsTableComponent },
        ],
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule,
    ],
})
export class ItemsRouting { }
