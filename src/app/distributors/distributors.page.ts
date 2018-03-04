import { Component } from '@angular/core';

import { DistributorsService } from 'app/core/distributors.service';

@Component({
    selector: 'kp-distributors-page',
    styleUrls: ['./distributors.page.scss'],
    templateUrl: './distributors.page.html'
})
export class DistributorsPage {
    distributors$ = this.distributorsService.distributors$;

    constructor(
        private distributorsService: DistributorsService,
    ) { }

    ngOnInit() {
        this.distributorsService.refresh();
    }
}
