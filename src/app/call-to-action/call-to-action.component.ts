import { Component, HostListener, HostBinding } from '@angular/core';
import { trigger, state, transition, style, animate } from '@angular/animations';

@Component({
    selector: 'kp-call-to-action',
    templateUrl: './call-to-action.component.html',
    styleUrls: ['./call-to-action.component.scss'],
    animations: [
        trigger('appear', [
            state('*', style({ transform: 'scale(1)' })),
            transition(':enter', [
                style({ transform: 'scale(0)' }),
                animate(100)
            ]),
            transition(':leave', [
                animate(100, style({ transform: 'scale(0)' }))
            ])
        ]),
        trigger('appear-100', [
            state('*', style({ transform: 'scale(1)' })),
            transition(':enter', [
                style({ transform: 'scale(0)' }),
                animate('0.1s 100ms')
            ]),
            transition(':leave', [
                animate(100, style({ transform: 'scale(0)' }))
            ])
        ])
    ]
})
export class CallToActionComponent {
    @HostBinding('class.hover') isHovered = false;
    @HostListener('mouseenter') onMouseEnter() { this.isHovered = true; }
    @HostListener('mouseleave') onMouseLeave() { this.isHovered = false; }

    addBaseItem() {
        // TODO: open a modal
    }

    addCompositeItem() {
        // TODO: open a modal
    }
}
