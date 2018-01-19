import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRouting } from './app.routing';
import { NavbarComponent } from './navbar/navbar.component';
import { HomePage } from './home/home.page';

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        HomePage,
    ],
    imports: [
        BrowserModule,
        AppRouting,
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
