import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompositeItemsPage } from './compositeitems.page';

const routes: Routes = [
    { path: '', component: CompositeItemsPage },
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
