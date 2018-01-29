import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';
import { CategoriesRouting } from './categories.routing';
import { CategoriesPage } from './categories.page';

@NgModule({
    declarations: [
        CategoriesPage,
    ],
    imports: [
        SharedModule,
        CategoriesRouting,
    ],
})
export class CategoriesModule { }
