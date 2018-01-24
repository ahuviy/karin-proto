import { Component, Input, ViewChild, HostBinding } from '@angular/core';
import { RouterLinkActive } from '@angular/router';

@Component({
    selector: 'kp-side-bar-link',
    templateUrl: './side-bar-link.component.html',
    styleUrls: ['./side-bar-link.component.scss']
})
export class SideBarLinkComponent {
    @Input() link;

    @ViewChild(RouterLinkActive) rla: RouterLinkActive;

    @HostBinding('attr.active') get isActive() { return this.rla.isActive; }
}
