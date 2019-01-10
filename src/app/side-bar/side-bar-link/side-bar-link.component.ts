import { Component, Input, ViewChild, HostBinding, HostListener } from '@angular/core';
import { RouterLinkActive } from '@angular/router';

@Component({
    selector: 'kp-side-bar-link',
    templateUrl: './side-bar-link.component.html',
    styleUrls: ['./side-bar-link.component.scss']
})
export class SideBarLinkComponent {
    @Input() link: Link;

    isHovered = false;

    @ViewChild(RouterLinkActive) rla: RouterLinkActive;

    @HostBinding('class.active') get isActive() { return this.rla.isActive; }

    execLinkAction(type: 'add' | 'rem', event) {
        event.preventDefault();
        event.stopPropagation();
        if (type === 'add') this.link.addAction();
        else if (type === 'rem') this.link.remAction();
    }
}

interface Link {
    url: string;
    options: any;
    icon: string;
    addAction?: Function;
    remAction?: Function
}
