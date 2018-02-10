import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { MatDialog } from '@angular/material';
import { filter, map } from 'rxjs/operators';

import { SideNavService } from 'app/core/side-nav.service';
import { routeLabels } from 'constants/route.consts';
import { SettingsModal } from 'app/settings/settings.modal';
// TODO: give the searchbar a dropdown for where to search: all|baseitems|compositeitems|distributors|categories...
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

    constructor(
        private router: Router,
        private sideNavService: SideNavService,
        private dialog: MatDialog,
    ) { }

    toggleSideNav() {
        this.sideNavService.toggle();
    }

    openSettingsModal() {
        this.dialog.open(SettingsModal, {
            direction: 'rtl',
            panelClass: 'kp-settings-modal-wrapper',
            height: '600px',
        });
    }
}
