import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './home/home.page';
import { UnrecognizedPage } from './unrecognized/unrecogrnized.page';

const routes: Routes = [
    { path: '', pathMatch: 'full', component: HomePage },
    { path: 'materials', loadChildren: 'app/materials/materials.module#MaterialsModule' },
    { path: 'items', loadChildren: 'app/items/items.module#ItemsModule' },
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
