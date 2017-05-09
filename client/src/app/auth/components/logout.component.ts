import { Component, OnInit } from '@angular/core';

import { AuthService } from '../services/auth.service';

@Component({
    selector:   'sa-auth-logout',
    template: 	'',
})

/**
 * Composant gérant la déconnexion
 *
 * @author Fabien Bellanger
 */
export class LogoutComponent implements OnInit
{
	/**
     * Constructeur
     *
     * @author Fabien Bellanger
     * @param {AuthService} authService
     */
    constructor(private authService: AuthService)
    {
    }

    /**
     * Initialisation du composant
     *
     * @author Fabien Bellanger
     */
    public ngOnInit(): void
    {
		// Déconnexion
		// -----------
		this.authService.logout(true, true);
    }
}
