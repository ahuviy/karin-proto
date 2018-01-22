import { Component } from '@angular/core';
import { MaterialsService } from 'app/materials/services/materials.service';

@Component({
    selector: 'kp-materials-page',
    styleUrls: ['./materials.page.scss'],
    templateUrl: './materials.page.html',
    providers: [
        MaterialsService,
    ],
})
export class MaterialsPage {
    
}
