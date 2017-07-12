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
                        path:      'parameters',
                        component: SprintParametersComponent,
                    },
                    {
                        path:      'statistics',
                        component: SprintStatisticsComponent,
                    },
                    {
                        path:      'tasks',
                        component: SprintTasksComponent,
                    },
                    {
                        path:      'edit-task',
                        component: SprintEditTaskComponent,
                    },
                    {
                        path:      'tasks-management',
                        component: SprintTasksManagementComponent,
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
