import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import { BaseItemsService } from 'app/core/base-items.service';
import { CompositeItemsService } from 'app/core/composite-items.service';
import { ItemCategoriesService } from 'app/core/item-categories.service';
import { BaseItem, CompositeItem } from 'server/server.interface';

interface GeneralItem {
    isBaseItem?: boolean;
    isCompositeItem?: boolean;
    item: BaseItem | CompositeItem;
}

@Component({
    selector: 'kp-categories-page',
    styleUrls: ['./categories.page.scss'],
    templateUrl: './categories.page.html'
})
export class CategoriesPage {
    categoryId$ = this.route.params.pipe(map(p => p.categoryId));

    categoryName$ = combineLatest(
        this.categoryId$,
        this.itemCategoriesService.itemCategories$,
    ).pipe(
        map(([ctgId, ctgs]) => ctgs.find(ctg => ctg.id === ctgId).name)
    );

    generalItems$: Observable<GeneralItem[]> = combineLatest(
        this.categoryId$,
        this.baseItemsService.baseItems$.pipe(map(bis => bis || [])),
        this.compositeItemsService.compositeItems$.pipe(map(cis => cis || [])),
    ).pipe(map(([ctgId, bis, cis]) => {
        const relevantCompItems = cis
            .filter(ci => ci.itemCategoryId === ctgId)
            .map(ci => ({ isCompositeItem: true, item: ci }));
        const relevantBaseItems = bis
            .filter(bi => bi.itemCategoryId === ctgId)
            .map(bi => ({ isBaseItem: true, item: bi }));
        return (relevantBaseItems as GeneralItem[])
            .concat(relevantCompItems as GeneralItem[]);
    }));

    constructor(
        private route: ActivatedRoute,
        private baseItemsService: BaseItemsService,
        private compositeItemsService: CompositeItemsService,
        private itemCategoriesService: ItemCategoriesService,
    ) { }

    ngOnInit() {
        this.baseItemsService.refresh();
        this.compositeItemsService.refresh();
        this.itemCategoriesService.refresh();
    }
}
