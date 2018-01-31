import { Pipe, PipeTransform } from '@angular/core';

import { weightUnitMap } from 'constants/weight.consts';

@Pipe({
    name: 'weightUnit',
    pure: true,
})
export class WeightUnitPipe implements PipeTransform {
    transform(value: string, args?: any): string {
        return weightUnitMap[value];
    }
}
