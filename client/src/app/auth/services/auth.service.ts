import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { ApiAuthService } from '../../api';
import { StorageService } from '../../shared';
import { UserService } from './user.service';

import { User } from '../../models';

@Injectable()

export class AuthService
{
    public isLoggedIn: boolean;

    /**
     * Constructeur
     *
     * @author Fabien Bellanger
     * @param {ApiAuthService}      apiAuthService
     * @param {StorageService}      storageService
     * @param {UserService}         userService
     * @param {Router}              router
     */
    constructor(private apiAuthService: ApiAuthService,
                private storageService: StorageService,
                private userService: UserService,
                private router: Router)
    {
        this.checkToken();
    }

    /**
     * Vérification du token d'authentification
     *
     * @author Fabien Bellanger
     */
    public checkToken(): void
    {
        const token: string = this.storageService.get('session', 'token', null);

        this.isLoggedIn = (token !== null);
    }

    /**
     * Authentification
     * 
     * @author Fabien Bellanger
     * @param {String}  email
     * @param {String}  password
     * @return {Promise}
     */
    public login(email: string, password: string): any
    {
        return new Promise((resolve: any, reject: any) =>
        {
            this.apiAuthService.login(email, password)
                .then((data: any) =>
                {
                    // -------------------
                    // Authentification OK
                    // -------------------
                    this.isLoggedIn = true;

                    // Enregistrement du token
                    // -----------------------
                    this.storageService.set('session', 'token', data.token);

                    // Enregistrement de l'utilisateur
                    // -------------------------------
                    const user: User = new User(
                        data.user.id,
                        data.user.lastname,
                        data.user.firstname,
                        data.user.email,
                        data.user.groupId,
                    );
                    this.userService.init(user);
                })
                .catch((error: any) =>
                {
                    // ---------------------------
                    // Echec de l'authentification
                    // ---------------------------
                    this.isLoggedIn = false;

                    reject(error);
                });
        });
    }

    /**
     * Logout
     *
     * @author Fabien Bellanger
     * @param {Boolean} sendRequest Envoi d'une requête au serveur (default false)
     * @param {Boolean} redirect    Redirection vers /logout (default false)
     */
    public logout(sendRequest: boolean = false, redirect: boolean = false): void
    {
        this.isLoggedIn = false;

        // Envoi requête au serveur ?
        // --------------------------
        if (sendRequest)
        {
            this.apiAuthService.logout().catch(() => {});
        }

        // Suppression de la session
        // -------------------------
        this.storageService.clear('session');

        // Redirection ?
        // -------------
        if (redirect)
        {
            this.router.navigate(['/login']);
        }
    }
}
