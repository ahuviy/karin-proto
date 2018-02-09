import { Component, Input, ViewChild, HostBinding, HostListener } from '@angular/core';
import { RouterLinkActive } from '@angular/router';

@Component({
    selector: 'kp-side-bar-link',
    templateUrl: './side-bar-link.component.html',
    styleUrls: ['./side-bar-link.component.scss']
})
export class SideBarLinkComponent {
    @Input() link;

    isHovered = false;

    @ViewChild(RouterLinkActive) rla: RouterLinkActive;

    @HostBinding('class.active') get isActive() { return this.rla.isActive; }

    execLinkAction(event) {
        event.preventDefault();
        event.stopPropagation();
        this.link.addAction();
    }
}
