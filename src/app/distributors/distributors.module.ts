import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';
import { DistributorsPage } from './distributors.page';
import { DistributorItemComponent } from './distributor-item/distributor-item.component';

@NgModule({
    declarations: [
        DistributorsPage,
        DistributorItemComponent,
    ],
    imports: [
        SharedModule,
    ],
    exports: [
        DistributorsPage,
    ],
})
export class DistributorsModule { }
