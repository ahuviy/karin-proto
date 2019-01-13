import { DropdownOption, ItemAutocompleteType } from './main-search.interface';

export const dropdownOptions: DropdownOption[] = [
    { value: 'all', label: 'הכל' },
    { value: 'baseItems', label: 'חומרי גלם' },
    { value: 'compositeItems', label: 'פריטים' },
    { value: 'distributors', label: 'ספקים' },
];

export const pathnameMap = {
    [ItemAutocompleteType.baseItem]: '/baseitems',
    [ItemAutocompleteType.compositeItem]: '/compositeitems',
    [ItemAutocompleteType.distributor]: '/distributors'
};
