import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'kp-alert-dialog',
    styleUrls: ['./alert.dialog.scss'],
    templateUrl: './alert.dialog.html',
})
export class AlertDialog {
    constructor( @Inject(MAT_DIALOG_DATA) public data: any) { }
}
