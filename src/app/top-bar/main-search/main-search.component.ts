import { Component, Output, EventEmitter, ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { BaseItemsService } from 'app/core/base-items.service';
import { CompositeItemsService } from 'app/core/composite-items.service';
import { DistributorsService } from 'app/core/distributors.service';
import { ItemAutocompleteOption, ItemAutocompleteType, DropdownOption } from './main-search.interface';
import { dropdownOptions } from './main-search.utils';

/**
 * This is the main search interface of the app.
 * It can search all data with autocomplete features.
 */
@Component({
    selector: 'kp-main-search',
    styleUrls: ['./main-search.component.scss'],
    templateUrl: './main-search.component.html',
})
export class MainSearchComponent {
    @Output() selected = new EventEmitter<ItemAutocompleteOption>();

    search = new FormControl('');
    isDropdownOpen = false;
    dropdownSelection$ = new BehaviorSubject<DropdownOption>(dropdownOptions[0]);
    dropdownOptions = dropdownOptions;

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
        this.distributorsService.distributors$,
    ).pipe(
        map(([bis, cis, dists]) => {
            const baseItems = bis ? bis.map(bi => ({
                type: ItemAutocompleteType.baseItem,
                item: bi
            })) : [] as ItemAutocompleteOption[];
            const compositeItems = cis ? cis.map(ci => ({
                type: ItemAutocompleteType.compositeItem,
                item: ci
            })) : [] as ItemAutocompleteOption[];
            const distributors = dists ? dists.map(d => ({
                type: ItemAutocompleteType.distributor,
                item: d,
            })) : [] as ItemAutocompleteOption[];
            return [...baseItems, ...compositeItems, ...distributors];
        }),
    );

    filteredOptions$: Observable<ItemAutocompleteOption[]> = combineLatest(
        this.allOptions$,
        this.searchStr$,
        this.dropdownSelection$,
    ).pipe(
        map(([options, searchStr, ddSelection]) => {
            if (searchStr) {
                return options.filter(opt => {
                    const isInSearch = opt.item.name.toLowerCase().includes(searchStr.toLowerCase());
                    return isInSearch && this.isOptionInDropdownSelection(opt, ddSelection);
                });
            } else {
                return options.filter(opt => this.isOptionInDropdownSelection(opt, ddSelection));
            }
        })
    );

    constructor(
        private baseItemsService: BaseItemsService,
        private compositeItemsService: CompositeItemsService,
        private distributorsService: DistributorsService,
        private el: ElementRef,
    ) { }

    ngOnInit() {
        this.baseItemsService.refresh();
        this.compositeItemsService.refresh();
        this.distributorsService.refresh();
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

    getDisplayedOptionString(option: ItemAutocompleteOption) {
        let parenthesis: string;
        switch (option.type) {
            case 'baseItem':
                parenthesis = 'חומר גלם';
                break;
            case 'compositeItem':
                parenthesis = 'פריט';
                break;
            case 'distributor':
                parenthesis = 'ספק';
                break;
            default:
                throw new Error('could not recognize ItemAutocompleteOption type');
        }
        return `${option.item.name} (${parenthesis})`
    }

    toggleDropdown() {
        this.isDropdownOpen = !this.isDropdownOpen;
    }

    closeDropdown() {
        this.isDropdownOpen = false;
    }

    selectOption(option) {
        this.dropdownSelection$.next(option);
        this.isDropdownOpen = false;
    }

    private isOptionInDropdownSelection(opt: ItemAutocompleteOption, ddSelection: DropdownOption) {
        if (ddSelection.value === 'all') {
            return true;
        } else if (ddSelection.value === 'baseItems') {
            return (opt.type === ItemAutocompleteType.baseItem);
        } else if (ddSelection.value === 'compositeItems') {
            return (opt.type === ItemAutocompleteType.compositeItem);
        } else if (ddSelection.value === 'distributors') {
            return (opt.type === ItemAutocompleteType.distributor);
        }
    }
}
