import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule, Http } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate';
import { ToastyModule } from 'ng2-toasty';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { DateService } from './services/date.service';
import { HttpService } from './services/http.service';
import { Rc4Service } from './services/rc4.service';
import { StorageService } from './services/storage.service';
import { ToolboxService } from './services/toolbox.service';

import { MomentPipe } from './pipes/moment.pipe';
import { NewLinePipe } from './pipes/new-line.pipe';
import { HourPipe } from './pipes/hour.pipe';

import { InputDirective } from './directives/input.directive';

export function createTranslateLoader(http: Http)
{
    return new TranslateStaticLoader(http, '../assets/i18n', '.json');
}

@NgModule({
    imports:      [
        CommonModule,
        HttpModule,
        FormsModule,
        RouterModule,
        TranslateModule.forRoot({
            provide:    TranslateLoader,
            useFactory: (createTranslateLoader),
            deps:       [Http],
        }),
        ToastyModule.forRoot(),
        SlimLoadingBarModule.forRoot(),
    ],
    declarations: [
        MomentPipe,
        NewLinePipe,
        HourPipe,
        InputDirective,
    ],
    providers:    [
        DateService,
        HttpService,
        Rc4Service,
        StorageService,
        ToolboxService,
    ],
    exports:      [
        HttpModule,
        FormsModule,
        RouterModule,
        TranslateModule,
        ToastyModule,
        SlimLoadingBarModule,
        MomentPipe,
        NewLinePipe,
        HourPipe,
        InputDirective,
    ],
})

export class SharedModule
{
}
