import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { AuthService } from './auth.service';

@Injectable()

export class AuthGuardService implements CanActivate
{
    /**
     * Constructeur
     * 
     * @author Fabien Bellanger
     * @param {AuthService}	authService
     * @param {Router}		router
     */
    constructor(private authService: AuthService,
                private router: Router)
    {
    }

    /**
     * Peut-on accéder à la route ?
     * 
     * @author Fabien Bellanger
     * @returns {boolean}
     */
    public canActivate(): boolean
    {
        if (this.authService.isLoggedIn)
        {
            return true;
        }

        // Navigate to the login page with extras
        this.router.navigate(['/login']);

        return false;
    }
}
