import { Routes, RouterModule } from '@angular/router';

import {
    AuthGuardService,
    LoginComponent,
    LogoutComponent,
    ForgottenPasswordComponent,
    NewPasswordComponent,
} from './auth';
import { 
    SprintComponent,
    SprintListComponent,
    SprintNewComponent,
    SprintStatisticsComponent,
    SprintTasksComponent,
    SprintEditTaskComponent,
    SprintParametersComponent,
    SprintTasksManagementComponent,
    SprintTasksManagementEditComponent,
    SprintTasksManagementListComponent,
} from './sprint';
import { 
    StatisticsComponent,
    StatisticsCirComponent,
} from './statistics';
import { 
    TeamComponent,
    TeamListComponent,
    TeamEditComponent,
} from './team';
import { LayoutComponent } from './layout';

const appRoutes: Routes = [
    {
        path:      'login',
        component: LoginComponent,
    },
    {
        path:      'logout',
        component: LogoutComponent,
    },
    {
        path:      'forgotten-password',
        component: ForgottenPasswordComponent,
    },
    {
        path:      'new-password/:token',
        component: NewPasswordComponent,
    },
    {
        path:        '',
        component:   LayoutComponent,
        canActivate: [AuthGuardService],
        children:    [
            {
                path:       '',
                redirectTo: 'sprints',
                pathMatch:  'prefix',
            },
            {
                path:        'sprints',
                component:   SprintComponent,
                children:    [
                    {
                        path:      '',
                        component: SprintListComponent,
                    },
                    {
                        path:      'new',
                        component: SprintNewComponent,
                    },
                    {
                        path:      ':sprintId/parameters',
                        component: SprintParametersComponent,
                    },
                    {
                        path:      ':sprintId/statistics',
                        component: SprintStatisticsComponent,
                    },
                    {
                        path:      ':sprintId/tasks',
                        component: SprintTasksComponent,
                    },
                    {
                        path:      ':sprintId/tasks/add',
                        component: SprintEditTaskComponent,
                    },
                    {
                        path:      ':sprintId/tasks/edit/:taskId',
                        component: SprintEditTaskComponent,
                    },
                    {
                        path:      ':sprintId/tasks-management-list',
                        component: SprintTasksManagementListComponent,
                    },
                    {
                        path:      ':sprintId/tasks-management',
                        component: SprintTasksManagementComponent,
                    },
                    {
                        path:      ':sprintId/tasks-management/:date',
                        component: SprintTasksManagementComponent,
                    },
                    {
                        path:      ':sprintId/tasks-management/edit/:userId/:taskId',
                        component: SprintTasksManagementEditComponent,
                    },
                    {
                        path:      ':sprintId/tasks-management/new/:userId',
                        component: SprintTasksManagementEditComponent,
                    },
                ],
            },
            {
                path:        'statistics',
                component:   StatisticsComponent,
                children:    [
                    {
                        path:      'cii-cir',
                        component: StatisticsCirComponent,
                    },
                ],
            },
            {
                path:        'teams',
                component:   TeamComponent,
                children:    [
                    {
                        path:      '',
                        component: TeamListComponent,
                    },
                    {
                        path:      'create',
                        component: TeamEditComponent,
                    },
                    {
                        path:      'edit/:teamId',
                        component: TeamEditComponent,
                    },
                ],
            },
        ],
    },
    {
        path:       '**',
        redirectTo: 'login',
    },
];

export const Routing: any = RouterModule.forRoot(appRoutes, {
    useHash: false,
});
