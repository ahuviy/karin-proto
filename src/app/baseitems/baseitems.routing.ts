import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BaseCompositeItemsPage } from './baseitems.page';

const routes: Routes = [
    { path: '', component: BaseCompositeItemsPage },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule,
    ],
})
export class BaseItemsRouting { }
