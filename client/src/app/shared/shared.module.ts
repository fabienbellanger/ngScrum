import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule, Http } from '@angular/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NgProgressModule, NgProgress } from '@ngx-progressbar/core';
import { ChartsModule } from 'ng2-charts';
import { MaterialModule } from '../material';

import { DateService } from './services/date.service';
import { HttpService } from './services/http.service';
import { Rc4Service } from './services/rc4.service';
import { StorageService } from './services/storage.service';
import { ToolboxService } from './services/toolbox.service';
import { CsvService } from './services/csv.service';

import { MomentPipe } from './pipes/moment.pipe';
import { NewLinePipe } from './pipes/new-line.pipe';
import { DurationPipe } from './pipes/duration.pipe';
import { PercentFrPipe } from './pipes/percent-fr.pipe';
import { NumberPipe } from './pipes/number.pipe';
import { DebugPipe } from './pipes/debug.pipe';

import { LoadingComponent } from './components/loading.component';

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
                useFactory: (HttpLoaderFactory),
                deps:       [HttpClient],
            }
        }),
        NgProgressModule.forRoot(),
        ChartsModule,
        MaterialModule,
    ],
    declarations: [
        MomentPipe,
        NewLinePipe,
        DurationPipe,
        PercentFrPipe,
        NumberPipe,
        DebugPipe,
        LoadingComponent,
    ],
    providers:    [
        DateService,
        HttpService,
        Rc4Service,
        StorageService,
        ToolboxService,
        CsvService,
    ],
    exports:      [
        HttpModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        TranslateModule,
        NgProgressModule,
        ChartsModule,
        MaterialModule,
        MomentPipe,
        NewLinePipe,
        DurationPipe,
        PercentFrPipe,
        NumberPipe,
        DebugPipe,
        LoadingComponent,
    ],
    entryComponents: [],
})

export class SharedModule
{
}
