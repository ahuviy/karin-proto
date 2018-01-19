import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MaterialsPage } from './materials.page';
import { MaterialsTableComponent } from './materials-table/materials-table.component';
import { AddMaterialComponent } from './add-material/add-material.component';

const routes: Routes = [
    {
        path: '',
        component: MaterialsPage,
        children: [
            { path: 'add', component: AddMaterialComponent },
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
