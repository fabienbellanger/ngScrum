import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService, LoginComponent, LogoutComponent } from './auth';
import { 
    SprintComponent,
    SprintListComponent,
    SprintInfoComponent,
    SprintTasksComponent,
    SprintAddTaskComponent,
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
                        path:      'info',
                        component: SprintInfoComponent,
                    },
                    {
                        path:      'tasks',
                        component: SprintTasksComponent,
                    },
                    {
                        path:      'add-task',
                        component: SprintAddTaskComponent,
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
    useHash: true,
});
