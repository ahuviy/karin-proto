import { Component, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { startWith, map, shareReplay } from 'rxjs/operators';

import { BaseItemsService } from 'app/core/base-items.service';
import { BaseItem } from 'server/server.interface';

@Component({
    selector: 'kp-ingredient',
    styleUrls: ['./ingredient.component.scss'],
    templateUrl: './ingredient.component.html'
})
export class IngredientComponent {
    @Input() ingCtrl: FormGroup;

    @Output() delete = new EventEmitter();

    @ViewChild('amountInput') amountInput: ElementRef;

    baseItem$: Observable<BaseItem>;
    editMode = false;

    constructor(private baseItemsService: BaseItemsService) { }

    ngOnInit() {
        this.baseItem$ = this.ingCtrl.valueChanges.pipe(
            startWith(this.ingCtrl.value),
            map(ing => {
                if (ing.baseItemId) {
                    return this.baseItemsService.baseItems.find(bi => bi.id === ing.baseItemId);
                } else {
                    throw 'oops, this shouldnt happen';
                }
            }),
            shareReplay(1),
        );
    }

    get ingredient() {
        return this.ingCtrl.value;
    }

    toggleEdit() {
        this.editMode = !this.editMode;
        if (this.editMode) {
            setTimeout(() => this.amountInput.nativeElement.focus(), 0);
        }
    }
}
