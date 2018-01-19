import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRouting } from './app.routing';
import { NavbarComponent } from './navbar/navbar.component';
import { HomePage } from './home/home.page';
import { MaterialsPageModule } from './materials/materials-page.module';

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        HomePage,
    ],
    imports: [
        BrowserModule,
        MaterialsPageModule,
        AppRouting,
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
