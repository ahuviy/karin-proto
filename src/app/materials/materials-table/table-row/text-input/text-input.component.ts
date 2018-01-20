import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

@Component({
    selector: 'kp-text-input',
    styleUrls: ['./text-input.component.scss'],
    templateUrl: './text-input.component.html',
    providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => TextInputComponent), multi: true }],
})
export class TextInputComponent implements ControlValueAccessor {
    @Input() readonly = false;
    
    inputValue: string;

    writeValue(val) { this.inputValue = val; }
    propagateChange(val?) { }
    registerOnChange(fn) { this.propagateChange = fn; }
    registerOnTouched(fn) { }
}
