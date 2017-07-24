import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { environment } from '../environments/environment';

import { Routing } from './app.routing';
import { AppComponent } from './app.component';

import { SharedModule } from './shared';
import { ApiModule } from './api';
import { AuthModule } from './auth';
import { SprintModule } from './sprint';
import { LayoutModule } from './layout';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        Routing,
        SharedModule,
        ApiModule,
        AuthModule,
        SprintModule,
        LayoutModule,
    ],
    providers: [
        { provide: LOCALE_ID, useValue: environment.locale },
    ],
    bootstrap: [AppComponent]
})

export class AppModule {}
