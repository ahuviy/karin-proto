import { Pipe, PipeTransform } from '@angular/core';

import { ItemCategoriesService } from 'app/core/item-categories.service';
import { ItemCategory } from 'server/server.interface';

@Pipe({
    name: 'idToItemCategory',
    pure: false,
})
export class IdToItemCategoryPipe implements PipeTransform {
    transform(value: string, args?: any): ItemCategory {
        const currentCtgs = this.itemCategoriesService.itemCategories;
        return currentCtgs ? currentCtgs.find(ctg => ctg.id === value) : undefined;
    }

    constructor(private itemCategoriesService: ItemCategoriesService) { }
}
