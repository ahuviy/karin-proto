import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRouting } from './app.routing';
import { TopBarComponent } from './top-bar/top-bar.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { SideBarLinkComponent } from './side-bar/side-bar-link/side-bar-link.component';
import { MainSearchComponent } from 'app/top-bar/main-search/main-search.component';
import { HomePage } from './home/home.page';
import { UnrecognizedPage } from './unrecognized/unrecogrnized.page';
import { CoreModule } from 'app/core/core.module';
import { SharedModule } from 'app/shared/shared.module';
import { CompositeItemsModule } from 'app/compositeitems/compositeitems.module';
import { SettingsModal } from 'app/settings/settings.modal';
import { AddBaseItemModal } from 'app/add-baseitem/add-baseitem.modal';
import { AddCompositeItemModal } from 'app/add-composite-item/add-composite-item.modal';
import { AddDistributorModal } from 'app/add-distributor/add-distributor.modal';
import { AddCategoryModal } from 'app/add-category/add-category.modal';
import { DistributorsModule } from 'app/distributors/distributors.module';

@NgModule({
    declarations: [
        AppComponent,
        SideBarComponent,
        SideBarLinkComponent,
        MainSearchComponent,
        TopBarComponent,
        SettingsModal,
        AddBaseItemModal,
        AddCompositeItemModal,
        AddDistributorModal,
        AddCategoryModal,
        UnrecognizedPage,
        HomePage,
    ],
    entryComponents: [
        SettingsModal,
        AddBaseItemModal,
        AddCompositeItemModal,
        AddDistributorModal,
        AddCategoryModal,
    ],
    imports: [
        BrowserAnimationsModule,
        CoreModule,
        SharedModule,
        DistributorsModule,
        CompositeItemsModule,
        AppRouting,
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
