import { Component, HostBinding, HostListener, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { filter } from 'rxjs/operators';

@Component({
    selector: 'kp-modal',
    styleUrls: ['./modal.component.scss'],
    templateUrl: './modal.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class ModalComponent {
    @Output() hasClosed = new EventEmitter();
    @Output() hasOpened = new EventEmitter();

    @HostBinding('style.visibility') visibility = 'hidden';

    @HostListener('click', ['$event']) cancel(e) {
        e.stopPropagation();
        this.close();
    }

    private escSub;

    ngOnInit() {
        this.escSub = fromEvent(window, 'keyup').pipe(
            filter((e: KeyboardEvent) => e.key === 'Escape'),
            filter((e: KeyboardEvent) => this.isOpen),
        ).subscribe(e => this.close());
    }

    ngOnDestroy() {
        this.escSub.unsubscribe();
    }

    get isOpen() {
        return (this.visibility === 'visible');
    }

    open() {
        this.visibility = 'visible';
        this.hasOpened.emit();
    }

    close() {
        this.visibility = 'hidden';
        this.hasClosed.emit();
    }

    onEscKey = (e) => {
        console.log(e);
    }
}
