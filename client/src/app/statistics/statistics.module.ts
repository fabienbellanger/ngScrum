import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { HttpService, SharedModule } from '../shared';
import { LayoutModule } from '../layout';

@NgModule({
    imports:         [
        CommonModule,
        HttpModule,
        RouterModule,
        SharedModule,
        LayoutModule,
    ],
    declarations:    [
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
