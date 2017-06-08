import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService, LoginComponent, LogoutComponent } from './auth';
import { SprintComponent, SprintListComponent, SprintInfoComponent } from './sprint';
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
                redirectTo: 'sprints/list',
                pathMatch:  'prefix',
            },
            {
                path:        'sprints',
                component:   SprintComponent,
                children:    [
                    {
                        path:      'list',
                        component: SprintListComponent,
                    },
                    {
                        path:      'info',
                        component: SprintInfoComponent,
                    },
                ],
            },
        ],
    },
    {
        path:      '**',
        component: LayoutComponent,
    },
];

export const Routing: any = RouterModule.forRoot(appRoutes, {
    useHash: true,
});
