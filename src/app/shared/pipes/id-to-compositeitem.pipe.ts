import { Pipe, PipeTransform } from '@angular/core';

import { CompositeItemsService } from 'app/core/composite-items.service';
import { CompositeItem } from 'server/server.interface';

@Pipe({
    name: 'idToCompositeItem',
    pure: false,
})
export class IdToCompositeItemPipe implements PipeTransform {
    transform(id: string): CompositeItem {
        const currentCompositeItems = this.compositeItemsService.compositeItems;
        return currentCompositeItems ? currentCompositeItems.find(ci => ci.id === id) : undefined;
    }

    constructor(private compositeItemsService: CompositeItemsService) { }
}
