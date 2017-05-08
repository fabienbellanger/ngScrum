import { Injectable } from '@angular/core';

import { ToastyService } from 'ng2-toasty';
import { TranslateService } from 'ng2-translate';

import { ApiAuthService } from '../api';
import { StorageService } from '../shared';

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
     * @param {ToastyService}       toastyService
     * @param {TranslateService}    translateService
     */
    constructor(private apiAuthService: ApiAuthService,
                private storageService: StorageService,
                private toastyService: ToastyService,
                private translateService: TranslateService)
    {
        this.isLoggedIn = true;
    }

    /**
     * Authentification
     * 
     * @author Fabien Bellanger
     * @param {String}  email
     * @param {String}  password
     */
    public login(email: string, password: string): void
    {
        this.apiAuthService.login(email, password)
            .then((data: any) =>
            {
                // -------------------
                // Authentification OK
                // -------------------
                console.log(data);

                // Enregistrement
                // --------------

                // Notification
                // ------------
                this.translateService.get('login.success')
                    .subscribe((res: string) =>
                    {
                        this.toastyService.success(res);
                    });
            })
            .catch((error: any) =>
            {
                // ---------------------------
                // Echec de l'authentification
                // ---------------------------
                console.error(error);
            });
    }
}
