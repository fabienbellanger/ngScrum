import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule, Http } from '@angular/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ToastyModule } from 'ng2-toasty';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { ChartsModule } from 'ng2-charts';
import { ModalModule } from 'angular2-modal';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';
import { MaterialModule } from '../material';

import { DateService } from './services/date.service';
import { HttpService } from './services/http.service';
import { Rc4Service } from './services/rc4.service';
import { StorageService } from './services/storage.service';
import { ToolboxService } from './services/toolbox.service';

import { MomentPipe } from './pipes/moment.pipe';
import { NewLinePipe } from './pipes/new-line.pipe';
import { DurationPipe } from './pipes/duration.pipe';
import { PercentPipe } from './pipes/percent.pipe';
import { NumberPipe } from './pipes/number.pipe';
import { DebugPipe } from './pipes/debug.pipe';

import { InputDirective } from './directives/input.directive';

export function HttpLoaderFactory(http: HttpClient)
{
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
    imports:      [
        CommonModule,
        HttpModule,
        HttpClientModule,
        FormsModule,
        RouterModule,
        TranslateModule.forRoot({
            loader: {
                provide:    TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps:       [HttpClient],
            }
        }),
        ToastyModule.forRoot(),
        SlimLoadingBarModule.forRoot(),
        ChartsModule,
        ModalModule.forRoot(),
        BootstrapModalModule,
        MaterialModule,
    ],
    declarations: [
        MomentPipe,
        NewLinePipe,
        DurationPipe,
        PercentPipe,
        NumberPipe,
        DebugPipe,
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
        ReactiveFormsModule,
        RouterModule,
        TranslateModule,
        ToastyModule,
        SlimLoadingBarModule,
        ChartsModule,
        MomentPipe,
        NewLinePipe,
        DurationPipe,
        PercentPipe,
        NumberPipe,
        DebugPipe,
        InputDirective,
        MaterialModule,
    ],
    entryComponents: [
        // CustomModal,
    ],
})

export class SharedModule
{
}
