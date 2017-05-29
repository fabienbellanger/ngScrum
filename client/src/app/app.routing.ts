import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService, LoginComponent, LogoutComponent } from './auth';
import { SprintListComponent } from './sprint';
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
                path:      '',
                component: SprintListComponent,
            },
            {
                path:      'sprints',
                component: SprintListComponent,
            },
        ],
    },
    {
        path:      '**',
        component: LayoutComponent,
    },
];

export const Routing: any = RouterModule.forRoot(appRoutes, {
    useHash: false,
});
