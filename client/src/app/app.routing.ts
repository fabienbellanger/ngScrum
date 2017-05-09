import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService, LoginComponent, LogoutComponent } from './auth';

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
        component:   LoginComponent,
        canActivate: [AuthGuardService],
    }
];

export const Routing: any = RouterModule.forRoot(appRoutes, {
    useHash: true,
});
