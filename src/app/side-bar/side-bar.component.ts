import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';

import { AddBaseItemModal } from 'app/add-baseitem/add-baseitem.modal';
import { AddCompositeItemModal } from 'app/add-composite-item/add-composite-item.modal';
import { AddDistributorModal } from 'app/add-distributor/add-distributor.modal';
import { AddCategoryModal } from 'app/add-category/add-category.modal';
import { AlertDialog } from 'app/shared/components/alert/alert.dialog';
import { routeLabels } from 'constants/route.consts';
import { ItemCategoriesService } from 'app/core/item-categories.service';

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
            url: '/baseitems',
            options: {},
            text: routeLabels['/baseitems'],
            icon: 'diamond',
            addAction: () => {
                this.dialog.open(AddBaseItemModal, {
                    direction: 'rtl',
                    panelClass: 'kp-add-baseitem-modal-wrapper',
                });
            }
        },
        {
            url: '/compositeitems',
            options: {},
            text: routeLabels['/compositeitems'],
            icon: 'cutlery',
            addAction: () => {
                this.dialog.open(AddCompositeItemModal, {
                    direction: 'rtl',
                    panelClass: 'kp-add-baseitem-modal-wrapper',
                });
            }
        },
        {
            url: '/distributors',
            options: {},
            text: routeLabels['/distributors'],
            icon: 'truck',
            addAction: () => {
                this.dialog.open(AddDistributorModal, {
                    direction: 'rtl',
                    panelClass: 'kp-add-baseitem-modal-wrapper',
                });
            }
        },
    ];
    categories$ = this.itemCategoriesService.itemCategories$.pipe(
        map(ic => ic || []),
        map(arr => arr.map(ic => ({
            url: `/category/${ic.id}`,
            options: {},
            text: ic.name,
            icon: 'folder',
            remAction: () => {
                const dialogRef = this.dialog.open(AlertDialog, {
                    direction: 'rtl',
                    data: {
                        title: 'אתה בטוח שאתה רוצה למחוק?',
                        message: `הקטגוריה ${ic.name} תימחק.`,
                        cancelBtn: 'ביטול',
                        confirmBtn: 'אישור',
                    },
                });
                dialogRef.afterClosed().subscribe(confirmed => {
                    if (!confirmed) return;
                    this.itemCategoriesService.delete(ic.id).then(() => {
                        // Navigate away from category if current page is the deleted category.
                        if (location.pathname.includes(`category/${ic.id}`)) {
                            this.router.navigateByUrl('/');
                        }
                    });
                });
            }
        }))),
    );

    constructor(
        private dialog: MatDialog,
        private itemCategoriesService: ItemCategoriesService,
        private router: Router,
    ) { }

    ngOnInit() {
        this.itemCategoriesService.refresh();
    }

    addCategory() {
        this.dialog.open(AddCategoryModal, {
            direction: 'rtl',
            panelClass: 'kp-add-baseitem-modal-wrapper',
        });
    }
}
