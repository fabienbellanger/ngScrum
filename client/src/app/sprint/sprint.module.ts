import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { HttpService, SharedModule } from '../shared';
import { LayoutModule } from '../layout';

import { SprintComponent } from './components/sprint.component';
import { SprintListComponent } from './components/sprint-list.component';
import { SprintNewComponent } from './components/sprint-new.component';
import { SprintStatisticsComponent } from './components/sprint-statistics.component';
import { SprintTasksComponent } from './components/task/sprint-tasks.component';
import { SprintEditTaskComponent } from './components/task/sprint-edit-task.component';
import { SprintParametersComponent } from './components/sprint-parameters.component';
import { SprintTasksManagementComponent } from './components/tasksManagement/sprint-tasks-management.component';
import { SprintTasksManagementEditComponent } from './components/tasksManagement/sprint-tasks-management-edit.component';
import { SprintTasksManagementListComponent } from './components/tasksManagement/sprint-tasks-management-list.component';
import { SprintDeleteDialogComponent } from './components/dialogs/sprint-delete-dialog.component';
import { SprintTaskDeleteDialogComponent } from './components/dialogs/sprint-task-delete-dialog.component';

import { SprintService } from './services/sprint.service';
import { SprintTasksManagementService } from './services/sprint-tasks-management.service';
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
        SprintTasksManagementComponent,
        SprintTasksManagementEditComponent,
        SprintTasksManagementListComponent,
        SprintNewComponent,
        SprintDeleteDialogComponent,
        SprintTaskDeleteDialogComponent,
    ],
    providers:    [
        HttpService,
        SprintService,
        SprintChartsService,
        SprintTasksManagementService,
    ],
    entryComponents:      [
        SprintDeleteDialogComponent,
        SprintTaskDeleteDialogComponent,
    ],
})

export class SprintModule
{
}
