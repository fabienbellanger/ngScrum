import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Headers } from '@angular/http';

import { HttpService, StorageService } from '../../shared';

@Injectable()

export class ApiAuthService
{
    /**
     * Constructeur
     *
     * @author Fabien Bellanger
     * @param {HttpService}		httpService
     * @param {StorageService}	storageService
     */
    constructor(private httpService: HttpService,
                private storageService: StorageService)
    {
    }

    /**
     * Login
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
            const headers: any = new Headers();
            headers.append('Content-Type', 'application/x-www-form-urlencoded');

            const data: any = {
                email:    email,
                password: password,
            };

            this.httpService.post('/login', data, {headers: headers}, false, true)
                .then((response: any) =>
                {
                    resolve(response);
                })
                .catch((error: any) =>
                {
                    reject(error);
                });
        });
    }

    /**
     * Déconnexion
     *
     * @author Fabien Bellanger
     * @return {Promise}
     */
    public logout(): any
    {
        return new Promise((resolve: any, reject: any) =>
        {
            // 1. Récupération du token
            // ------------------------
            const token: string = this.storageService.get('session', 'token', null);

            if (token != null)
            {
                // 2. Déconnexion
                // --------------
                const headers: any = new Headers();
                headers.append('Authorization', 'Bearer ' + token);
                headers.append('Content-Type', 'application/json');

                this.httpService.get('/logout', {headers: headers}, true, true)
                    .then(() =>
                    {
                        resolve();
                    })
                    .catch(() =>
                    {
                        reject();
                    });
            }
            else
            {
                reject();
            }
        });
    }

    /**
     * Vérification du token
     *
     * @author Fabien Bellanger
     * @return {Promise}
     */
    public checkToken(): any
    {
        return new Promise((resolve: any, reject: any) =>
        {
            // 1. Récupération du token
            // ------------------------
            const token: string = this.storageService.get('session', 'token', null);

            if (token != null)
            {
                // 2. Vérification du token
                // ------------------------
                const headers: any = new Headers();
                headers.append('Authorization', 'Bearer ' + token);
                headers.append('Content-Type', 'application/json');

                this.httpService.get('/check-token', {headers: headers}, true, true)
                    .then(() =>
                    {
                        resolve();
                    })
                    .catch(() =>
                    {
                        reject();
                    });
            }
            else
            {
                reject();
            }
        });
    }
}
