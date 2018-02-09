import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';
import { DistributorsPage } from './distributors.page';
import { DistributorDetailsComponent } from './distributor-details/distributor-details.component';

@NgModule({
    declarations: [
        DistributorsPage,
        DistributorDetailsComponent,
    ],
    imports: [
        SharedModule,
    ],
    exports: [
        DistributorsPage,
    ],
})
export class DistributorsModule { }
