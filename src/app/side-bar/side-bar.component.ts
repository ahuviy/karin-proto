import { Component } from '@angular/core';

import { routeLabels } from 'constants/route.consts';

@Component({
    selector: 'kp-side-bar',
    templateUrl: './side-bar.component.html',
    styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent {
    links = [
        {
            url: '/',
            options: { exact: true },
            text: routeLabels['/'],
            icon: 'archive',
        },
        {
            url: '/materials',
            options: {},
            text: routeLabels['/materials'],
            icon: 'truck',
        },
        {
            url: '/items',
            options: {},
            text: routeLabels['/items'],
            icon: 'truck',
        },
    ];
}
