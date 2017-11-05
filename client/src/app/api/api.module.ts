import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { SharedModule, HttpService } from '../shared';
import { ApiAuthService } from './services/api-auth.service';
import { ApiUserService } from './services/api-user.service';
import { ApiSprintService } from './services/api-sprint.service';
import { ApiTaskService } from './services/api-task.service';
import { ApiStatisticsService } from './services/api-statistics.service';
import { ApiTeamService } from './services/api-team.service';

@NgModule({
    imports:      [
        CommonModule,
        HttpModule,
        RouterModule,
        SharedModule,
    ],
    declarations: [
    ],
    providers:    [
        HttpService,
        ApiAuthService,
        ApiUserService,
        ApiSprintService,
        ApiTaskService,
        ApiStatisticsService,
        ApiTeamService,
    ],
    exports:      [
    ],
})

export class ApiModule
{
}
