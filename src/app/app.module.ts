import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRouting } from './app.routing';
import { NavbarComponent } from './navbar/navbar.component';
import { HomePage } from './home/home.page';
import { CoreModule } from 'app/core/core.module';

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        HomePage,
    ],
    imports: [
        BrowserModule,
        CoreModule,
        AppRouting,
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
