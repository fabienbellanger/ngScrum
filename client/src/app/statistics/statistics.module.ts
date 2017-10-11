import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { HttpService, SharedModule } from '../shared';
import { LayoutModule } from '../layout';

import { StatisticsComponent } from './components/statistics.component';
import { StatisticsCirComponent } from './components/statistics-cir.component';

@NgModule({
    imports:         [
        CommonModule,
        HttpModule,
        RouterModule,
        SharedModule,
        LayoutModule,
    ],
    declarations:    [
        StatisticsCirComponent,
        StatisticsComponent,
    ],
    providers:       [
        HttpService,
    ],
    entryComponents: [
    ],
    exports:         [
    ],
})

export class StatisticsModule
{
}
