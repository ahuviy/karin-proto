import { Component, Input, HostBinding, HostListener, Output, EventEmitter, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'kp-modal',
    styleUrls: ['./modal.component.scss'],
    templateUrl: './modal.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class ModalComponent {
    @Input() cssClass = '';

    @Output() hasClosed = new EventEmitter();
    @Output() hasOpened = new EventEmitter();

    @HostBinding('style.visibility') visibility = 'hidden';

    @HostListener('click', ['$event']) cancel(e) {
        e.stopPropagation();
        this.close();
    }

    open() {
        this.visibility = 'visible';
        this.hasOpened.emit();
    }

    close() {
        this.visibility = 'hidden';
        this.hasClosed.emit();
    }
}
