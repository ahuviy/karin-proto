import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'kp-ingredient',
    styleUrls: ['./ingredient.component.scss'],
    templateUrl: './ingredient.component.html'
})
export class IngredientComponent {
    @Input() ingCtrl: FormControl;

    get ingredient() {
        return this.ingCtrl.value;
    }
}
