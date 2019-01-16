import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatExpansionPanel } from '@angular/material/expansion';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { map } from 'rxjs/operators';

import { CompositeItemsService } from 'app/core/composite-items.service';
import { BaseItemsService } from 'app/core/base-items.service';

@Component({
    selector: 'kp-compositeitems-page',
    styleUrls: ['./compositeitems.page.scss'],
    templateUrl: './compositeitems.page.html'
})
export class CompositeItemsPage {
    @ViewChild(MatExpansionPanel) firstExpansionPanel: MatExpansionPanel;

    subs = [];

    compositeItems$ = combineLatest(
        this.compositeItemsService.compositeItems$,
        this.route.queryParams,
    ).pipe(
        map(([cis, { id }]) => {
            cis = cis || [];
            return id ? [cis.find(ci => ci.id === id)] : cis;
        }),
    );

    constructor(
        private baseItemsService: BaseItemsService,
        private compositeItemsService: CompositeItemsService,
        private route: ActivatedRoute,
    ) { }

    ngAfterViewInit() {
        this.compositeItemsService.refresh();
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
