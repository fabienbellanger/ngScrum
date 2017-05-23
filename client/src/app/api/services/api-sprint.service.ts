import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Headers } from '@angular/http';

import { HttpService, StorageService } from '../../shared';
import { User } from '../../models/user';

@Injectable()

export class ApiSprintService
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
     * Retourne la liste des sprints
     *
     * @author Fabien Bellanger
     * @param {string} state Etat {all, inProgress, finished}
     * @return {Promise}
     */
    public getList(state: string): any
    {
        return new Promise((resolve: any, reject: any) =>
        {
            // 1. Récupération du token
            // ------------------------
            const token: string = this.storageService.get('session', 'token', null);

            if (token != null)
            {
                // 2. Utilisateur
                // --------------
                const user: User = this.storageService.get('session', 'user', null);

                if (user != null)
                {
                    // 3. Déconnexion
                    // --------------
                    const headers: any = new Headers();
                    headers.append('Authorization', 'Bearer ' + token);
                    headers.append('Content-Type', 'application/json');

                    this.httpService.get(`/users/${user.id}/sprints/${state}`, {headers: headers}, true, true)
                        .then((sprints: any) =>
                        {
                            resolve(sprints);
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
            }
            else
            {
                reject();
            }
        });
    }
}
