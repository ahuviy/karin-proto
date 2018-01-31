import { Component } from '@angular/core';
import { map } from 'rxjs/operators';

import { routeLabels } from 'constants/route.consts';
import { ItemCategoriesService } from 'app/core/item-categories.service';

@Component({
    selector: 'kp-side-bar',
    templateUrl: './side-bar.component.html',
    styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent {
    links = [
        {
            url: '/',
            options: { exact: true },
            text: routeLabels['/'],
            icon: 'archive',
        },
        {
            url: '/baseitems',
            options: {},
            text: routeLabels['/baseitems'],
            icon: 'diamond',
        },
        {
            url: '/compositeitems',
            options: {},
            text: routeLabels['/compositeitems'],
            icon: 'cutlery',
        },
        {
            url: '/distributors',
            options: {},
            text: routeLabels['/distributors'],
            icon: 'truck',
        },
    ];
    categories$ = this.itemCategoriesService.itemCategories$.pipe(
        map(ic => ic || []),
        map(arr => arr.map(ic => ({
            url: `/category/${ic.id}`,
            options: {},
            text: ic.name,
            icon: 'folder',
        }))),
    );

    constructor(private itemCategoriesService: ItemCategoriesService) { }

    ngOnInit() {
        this.itemCategoriesService.refresh();
    }
}
