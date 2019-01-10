import { Component, Output, EventEmitter, ElementRef, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatInput } from '@angular/material';
import { map, startWith } from 'rxjs/operators';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { Observable } from 'rxjs/Observable';

import { BaseItemsService } from 'app/core/base-items.service';
import { CompositeItemsService } from 'app/core/composite-items.service';
import { BaseItem, CompositeItem } from 'server/server.interface';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export interface ItemAutocompleteOption {
    type: string;
    item: BaseItem | CompositeItem;
}

interface BlacklistItem {
    baseItemId: string;
    compositeItemId: string;
}

@Component({
    selector: 'kp-item-autocomplete',
    styleUrls: ['./item-autocomplete.component.scss'],
    templateUrl: './item-autocomplete.component.html',
})
export class ItemAutocompleteComponent {
    // A blacklist of options that will not appear in the dropdown.
    @Input() set blacklist(val: BlacklistItem[]) {
        this._blacklist$.next(val || []);
    }

    @Output() selected = new EventEmitter<ItemAutocompleteOption>();

    search = new FormControl('');
    _blacklist$ = new BehaviorSubject<BlacklistItem[]>([]);

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
        this._blacklist$,
    ).pipe(
        map(([options, searchStr, blacklist]) => {
            if (searchStr) {
                return options.filter(opt => {
                    return (opt.item.name.toLowerCase().indexOf(searchStr.toLowerCase()) === 0)
                        && !this.isOptionInBlacklist(opt, blacklist);
                })
            } else {
                return options.filter(opt => !this.isOptionInBlacklist(opt, blacklist));
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

    private isOptionInBlacklist(option: ItemAutocompleteOption, blacklist: BlacklistItem[]) {
        return blacklist.some(bl => {
            return (option.type === 'baseItem' && option.item.id === bl.baseItemId)
                || (option.type === 'compositeItem' && option.item.id === bl.compositeItemId);
        });
    }
}
