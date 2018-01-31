import { Component } from '@angular/core';

import { SideNavService } from 'app/core/side-nav.service';
import { AddItemService } from 'app/core/add-item.service';
import { DistributorsService } from 'app/core/distributors.service';
import { SettingsService } from 'app/core/settings.service';
import { ItemCategoriesService } from 'app/core/item-categories.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    showSideNav$ = this.sideNavService.isOpen$;

    constructor(
        private sideNavService: SideNavService,
        private distributorsService: DistributorsService,
        private itemCategoriesService: ItemCategoriesService,
        private settingsService: SettingsService,
        public addItemService: AddItemService,
    ) { }

    ngOnInit() {
        this.settingsService.refresh();  // should be done on user login.
        this.itemCategoriesService.refresh();  // should be done on user login.
        this.distributorsService.refresh();  // should be done on user login.
    }
}
