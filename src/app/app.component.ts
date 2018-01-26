import { Component } from '@angular/core';

import { SideNavService } from 'app/core/side-nav.service';
import { AddItemService } from 'app/core/add-item.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    showSideNav$ = this.sideNavService.isOpen$;

    constructor(
        private sideNavService: SideNavService,
        public addItemService: AddItemService,
    ) { }
}
