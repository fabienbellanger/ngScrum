import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { Routing } from './app.routing';
import { AppComponent } from './app.component';

import { SharedModule } from './shared';
import { ApiModule } from './api';

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
    ],
    providers: [],
    bootstrap: [AppComponent]
})

export class AppModule {}
