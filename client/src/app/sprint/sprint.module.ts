import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { SharedModule, HttpService } from '../shared';
import { LayoutModule } from '../layout';

import { SprintListComponent } from './components/sprint-list.component';

@NgModule({
    imports:      [
        CommonModule,
        HttpModule,
        RouterModule,
        SharedModule,
        LayoutModule,
    ],
    declarations: [
		SprintListComponent,
    ],
    providers:    [
		HttpService,
    ],
    exports:      [
		SprintListComponent,
    ],
})

export class SprintModule
{
}
