import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService, LoginComponent, LogoutComponent } from './auth';
import { 
    SprintComponent,
    SprintListComponent,
    SprintStatisticsComponent,
    SprintTasksComponent,
    SprintEditTaskComponent,
    SprintParametersComponent,
    SprintTasksManagementComponent,
    SprintTasksManagementEditComponent,
} from './sprint';
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
                        path:      ':sprintId/tasks-management',
                        component: SprintTasksManagementComponent,
                    },
                    {
                        path:      ':sprintId/tasks-management/edit',
                        component: SprintTasksManagementEditComponent,
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
