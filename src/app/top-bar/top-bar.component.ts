import { Component } from '@angular/core';

import { SideNavService } from 'app/core/side-nav.service';

@Component({
    selector: 'kp-top-bar',
    styleUrls: ['./top-bar.component.scss'],
    templateUrl: './top-bar.component.html',
})
export class TopBarComponent {
    constructor(private sideNavService: SideNavService) { }

    toggleSideNav() {
        this.sideNavService.toggle();
    }
}
