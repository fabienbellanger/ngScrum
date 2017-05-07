import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './auth';

const appRoutes: Routes = [
    {
        path:      'login',
        component: LoginComponent,
    }
];

export const Routing: any = RouterModule.forRoot(appRoutes, {
    useHash: true,
});
