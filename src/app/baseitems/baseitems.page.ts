import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatExpansionPanel } from '@angular/material/expansion';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { map } from 'rxjs/operators';

import { BaseItemsService } from 'app/core/base-items.service';

@Component({
    selector: 'kp-baseitems-page',
    styleUrls: ['./baseitems.page.scss'],
    templateUrl: './baseitems.page.html',
})
export class BaseItemsPage {
    @ViewChild(MatExpansionPanel) firstExpansionPanel: MatExpansionPanel;

    subs = [];

    baseItems$ = combineLatest(
        this.baseItemsService.baseItems$,
        this.route.queryParams,
    ).pipe(
        map(([bis, { id }]) => {
            bis = bis || [];
            return id ? [bis.find(bi => bi.id === id)] : bis;
        }),
    );

    constructor(
        private baseItemsService: BaseItemsService,
        private route: ActivatedRoute,
    ) { }

    ngAfterViewInit() {
        this.baseItemsService.refresh();
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
