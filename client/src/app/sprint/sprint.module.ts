import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { SharedModule, HttpService } from '../shared';
import { LayoutModule } from '../layout';

import { SprintComponent } from './components/sprint.component';
import { SprintListComponent } from './components/sprint-list.component';
import { SprintStatisticsComponent } from './components/sprint-statistics.component';
import { SprintTasksComponent } from './components/task/sprint-tasks.component';
import { SprintEditTaskComponent } from './components/task/sprint-edit-task.component';
import { SprintParametersComponent } from './components/sprint-parameters.component';

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
        SprintStatisticsComponent,
        SprintTasksComponent,
        SprintEditTaskComponent,
        SprintComponent,
        SprintParametersComponent,
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
