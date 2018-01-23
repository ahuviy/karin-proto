import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRouting } from './app.routing';
import { TopBarComponent } from './top-bar/top-bar.component';
import { HomePage } from './home/home.page';
import { UnrecognizedPage } from './unrecognized/unrecogrnized.page';
import { CoreModule } from 'app/core/core.module';

@NgModule({
    declarations: [
        AppComponent,
        TopBarComponent,
        UnrecognizedPage,
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
