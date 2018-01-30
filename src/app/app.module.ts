import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRouting } from './app.routing';
import { TopBarComponent } from './top-bar/top-bar.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { SideBarLinkComponent } from './side-bar/side-bar-link/side-bar-link.component';
import { HomePage } from './home/home.page';
import { UnrecognizedPage } from './unrecognized/unrecogrnized.page';
import { CoreModule } from 'app/core/core.module';
import { SharedModule } from 'app/shared/shared.module';
import { SettingsModal } from 'app/settings/settings.modal';
import { AddItemModal } from 'app/add-item/add-item.modal';

@NgModule({
    declarations: [
        AppComponent,
        SideBarComponent,
        SideBarLinkComponent,
        TopBarComponent,
        SettingsModal,
        AddItemModal,
        UnrecognizedPage,
        HomePage,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        CoreModule,
        SharedModule,
        AppRouting,
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
