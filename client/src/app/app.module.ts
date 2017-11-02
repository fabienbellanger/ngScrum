import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Locale en Français
// ------------------
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import localeFrExtra from '@angular/common/locales/extra/fr';

registerLocaleData(localeFr, localeFrExtra);

import { environment } from '../environments/environment';

import { Routing } from './app.routing';
import { AppComponent } from './app.component';

import { SharedModule } from './shared';
import { ApiModule } from './api';
import { AuthModule } from './auth';
import { SprintModule } from './sprint';
import { LayoutModule } from './layout';
import { MaterialModule } from './material';
import { StatisticsModule } from './statistics';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        BrowserAnimationsModule,
        MaterialModule,
        Routing,
        SharedModule,
        ApiModule,
        AuthModule,
        SprintModule,
        LayoutModule,
        StatisticsModule,
    ],
    providers: [
        { provide: LOCALE_ID, useValue: environment.locale },
    ],
    bootstrap: [AppComponent]
})

export class AppModule {}
