import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { map } from 'rxjs/operators';
import { MatExpansionPanel } from '@angular/material/expansion';

import { DistributorsService } from 'app/core/distributors.service';

@Component({
    selector: 'kp-distributors-page',
    styleUrls: ['./distributors.page.scss'],
    templateUrl: './distributors.page.html'
})
export class DistributorsPage {
    @ViewChild(MatExpansionPanel) firstExpansionPanel: MatExpansionPanel;

    subs = [];

    distributors$ = combineLatest(
        this.distributorsService.distributors$,
        this.route.queryParams,
    ).pipe(
        map(([dists, { id }]) => {
            dists = dists || [];
            return id ? [dists.find(d => d.id === id)] : dists;
        }),
    );

    constructor(
        private distributorsService: DistributorsService,
        private route: ActivatedRoute,
    ) { }

    ngAfterViewInit() {
        this.distributorsService.refresh();
        this.subs.push(this.route.queryParams.subscribe(({ id }) => {
            // If there is an id (we searched something specific), we expand the 1st panel.
            // setTimeout is necessary to prevent an Angular change-detection error.
            setTimeout(() => this.firstExpansionPanel.expanded = !!id);
        }));
    }

    ngOnDestroy() {
        this.subs.forEach(s => s.unsubscribe());
    }
}
