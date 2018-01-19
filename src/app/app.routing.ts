import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './home/home.page';
import { MaterialsPage } from './materials/materials.page';

const routes: Routes = [
    { path: 'home', component: HomePage },
    { path: 'materials', component: MaterialsPage },
    { path: '**', redirectTo: 'home' },
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
