import { Component } from '@angular/core';

@Component({
    selector: 'kp-side-bar',
    templateUrl: './side-bar.component.html',
    styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent {
    links = [
        { url: 'materials', options: {}, text: 'חומרי גלם' },
        { url: 'items', options: {}, text: 'פריטים' },
        { url: 'settings', options: {}, text: 'הגדרות' },
    ];
}
