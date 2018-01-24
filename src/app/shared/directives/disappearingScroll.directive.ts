import { Directive, HostBinding, HostListener, ChangeDetectorRef } from '@angular/core';

@Directive({
    selector: '[disappearing-scroll]',
})
export class DisappearingScrollDirective {
    constructor(private cd: ChangeDetectorRef) { }

    @HostBinding('style.overflowY') overflow = 'scroll';

    @HostListener('mouseenter') onMouseEnter() {
        this.overflow = 'scroll';
        this.cd.markForCheck();
    }

    @HostListener('mouseleave') onMouseLeave() {
        this.overflow = 'hidden';
        this.cd.markForCheck();
    }
}
