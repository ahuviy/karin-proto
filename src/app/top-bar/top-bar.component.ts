import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';

import { SideNavService } from 'app/core/side-nav.service';
import { routeLabels } from 'constants/route.consts';

@Component({
    selector: 'kp-top-bar',
    styleUrls: ['./top-bar.component.scss'],
    templateUrl: './top-bar.component.html',
})
export class TopBarComponent {
    currentRoute$ = this.router.events.pipe(
        filter(e => e instanceof NavigationEnd),
        map((e: NavigationEnd) => routeLabels[e.urlAfterRedirects]),
    );
    showSettingsModal = false;

    constructor(
        private router: Router,
        private sideNavService: SideNavService,
    ) { }

    toggleSideNav() {
        this.sideNavService.toggle();
    }
}
