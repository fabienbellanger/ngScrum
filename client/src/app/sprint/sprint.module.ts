import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { SharedModule, HttpService } from '../shared';
import { LayoutModule } from '../layout';

import { SprintComponent } from './components/sprint.component';
import { SprintListComponent } from './components/sprint-list.component';
import { SprintInfoComponent } from './components/info/sprint-info.component';
import { SprintTasksComponent } from './components/tasks/sprint-tasks.component';

import { SprintService } from './services/sprint.service';
import { SprintChartsService } from './services/sprint-charts.service';

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
        SprintInfoComponent,
        SprintTasksComponent,
        SprintComponent,
    ],
    providers:    [
		HttpService,
        SprintService,
        SprintChartsService,
    ],
    exports:      [
    ],
})

export class SprintModule
{
}
