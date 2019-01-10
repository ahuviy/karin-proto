import { Component, Output, EventEmitter, ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { Observable } from 'rxjs/Observable';

import { BaseItemsService } from 'app/core/base-items.service';
import { CompositeItemsService } from 'app/core/composite-items.service';
import { BaseItem, CompositeItem } from 'server/server.interface';

/**
 * This is the main search interface of the app.
 * It can search all data with autocomplete features.
 * TODO: add implementation for distributors search.
 */
@Component({
    selector: 'kp-main-search',
    styleUrls: ['./main-search.component.scss'],
    templateUrl: './main-search.component.html',
})
export class MainSearchComponent {
    @Output() selected = new EventEmitter<ItemAutocompleteOption>();

    search = new FormControl('');

    searchStr$: Observable<string> = this.search.valueChanges.pipe(
        startWith(''),
        map((value: string | ItemAutocompleteOption) => {
            if (typeof value === 'string') return value;
            else return value.item.name;
        }),
    );

    allOptions$: Observable<ItemAutocompleteOption[]> = combineLatest(
        this.baseItemsService.baseItems$,
        this.compositeItemsService.compositeItems$,
    ).pipe(
        map(([bis, cis]) => {
            const baseItems = bis ? bis.map(bi => ({
                type: 'baseItem',
                item: bi
            })) : [] as ItemAutocompleteOption[];
            const compositeItems = cis ? cis.map(ci => ({
                type: 'compositeItem',
                item: ci
            })) : [] as ItemAutocompleteOption[];
            return baseItems.concat(compositeItems);
        }),
    );

    filteredOptions$: Observable<ItemAutocompleteOption[]> = combineLatest(
        this.allOptions$,
        this.searchStr$,
    ).pipe(
        map(([options, searchStr]) => {
            if (searchStr) {
                return options.filter(opt => {
                    return (opt.item.name.toLowerCase().indexOf(searchStr.toLowerCase()) === 0);
                })
            } else {
                return options.slice();
            }
        })
    );

    constructor(
        private baseItemsService: BaseItemsService,
        private compositeItemsService: CompositeItemsService,
        private el: ElementRef,
    ) { }

    ngOnInit() {
        this.baseItemsService.refresh();
        this.compositeItemsService.refresh();
        this.search.valueChanges.subscribe(s => {
            if (typeof s !== 'string') {
                setTimeout(() => {
                    this.el.nativeElement.querySelector('input').blur();
                    this.search.setValue('');
                    this.selected.emit(s);
                });
            }
        });
    }

    displayFn(option?: ItemAutocompleteOption): string {
        if (typeof option === 'string') return option;
        else return option.item.name;
    }
}

export interface ItemAutocompleteOption {
    type: string;
    item: BaseItem | CompositeItem;
}
