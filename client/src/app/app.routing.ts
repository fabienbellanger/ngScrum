import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService, LoginComponent } from './auth';

const appRoutes: Routes = [
    {
        path:      'login',
        component: LoginComponent,
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
