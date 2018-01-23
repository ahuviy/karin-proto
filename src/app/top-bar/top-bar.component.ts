import { Component, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'kp-top-bar',
    styleUrls: ['./top-bar.component.scss'],
    templateUrl: './top-bar.component.html'
})
export class TopBarComponent {
    @Output() menuBtnClick = new EventEmitter();

    links = [
        { url: 'materials', options: {}, text: 'חומרי גלם' },
        { url: 'items', options: {}, text: 'פריטים' },
        { url: 'settings', options: {}, text: 'הגדרות' },
    ];
}
