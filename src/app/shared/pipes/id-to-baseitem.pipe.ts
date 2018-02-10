import { Pipe, PipeTransform } from '@angular/core';

import { BaseItemsService } from 'app/core/base-items.service';
import { BaseItem } from 'server/server.interface';

@Pipe({
    name: 'idToBaseItem',
    pure: false,
})
export class IdToBaseItemPipe implements PipeTransform {
    transform(id: string): BaseItem {
        const currentBaseItems = this.baseItemsService.baseItems;
        return currentBaseItems ? currentBaseItems.find(bi => bi.id === id) : undefined;
    }

    constructor(private baseItemsService: BaseItemsService) { }
}
