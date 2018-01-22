import { Component } from '@angular/core';

@Component({
    selector: 'kp-navbar',
    styleUrls: ['./navbar.component.scss'],
    templateUrl: './navbar.component.html'
})
export class NavbarComponent {
    links = [
        { url: 'home', text: 'מתמחר' },
        { url: 'materials', text: 'חומרי גלם' },
        { url: 'items', text: 'פריטים' },
        { url: 'settings', text: 'הגדרות' },
    ];
}
