import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './home/home.page';

const routes: Routes = [
    { path: 'home', component: HomePage },
    { path: 'materials', loadChildren: 'app/materials/materials.module#MaterialsModule' },
    { path: 'items', loadChildren: 'app/items/items.module#ItemsModule' },
    { path: 'settings', loadChildren: 'app/settings/settings.module#SettingsModule' },
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
