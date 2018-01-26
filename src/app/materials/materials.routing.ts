import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MaterialsPage } from './materials.page';
import { MaterialsTableComponent } from './materials-table/materials-table.component';

const routes: Routes = [
    {
        path: '',
        component: MaterialsPage,
        children: [
            { path: '', component: MaterialsTableComponent },
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
export class MaterialsRouting { }
