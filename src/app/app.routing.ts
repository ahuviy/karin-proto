import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './home/home.page';
import { UnrecognizedPage } from './unrecognized/unrecogrnized.page';
import { DistributorsPage } from './distributors/distributors.page';
import { CompositeItemsPage } from './compositeitems/compositeitems.page';

const routes: Routes = [
    { path: '', pathMatch: 'full', component: HomePage },
    { path: 'baseitems', loadChildren: 'app/baseitems/baseitems.module#BaseCompositeItemsModule' },
    { path: 'compositeitems', component: CompositeItemsPage },
    { path: 'distributors', component: DistributorsPage },
    { path: 'category', loadChildren: 'app/categories/categories.module#CategoriesModule' },
    { path: 'unrecognized', component: UnrecognizedPage },
    { path: '**', redirectTo: 'unrecognized' },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes),
    ],
    exports: [
        RouterModule,
    ],
})
export class AppRouting { }
