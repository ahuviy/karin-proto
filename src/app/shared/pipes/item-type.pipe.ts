import { Pipe, PipeTransform } from '@angular/core';

import { itemTypeMap } from 'constants/item.consts';

@Pipe({
    name: 'itemType',
    pure: true,
})
export class ItemTypePipe implements PipeTransform {
    transform(value: string, args?: any): string {
        return itemTypeMap[value];
    }
}
