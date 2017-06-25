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

    /**
     * Retourne les informations d'un sprint
     *
     * @author Fabien Bellanger
     * @param {number} sprintId ID du sprint
     * @return {Promise}
     */
    public getSprintInformation(sprintId: number): any
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

                    this.httpService.get(`/users/${user.id}/sprints/${sprintId}`, {headers: headers}, true, true)
                        .then((sprint: any) =>
                        {
                            resolve(sprint);
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

    /**
     * Ajout d'une tâche
     * 
     * @author Fabien Bellanger
     * @param {number} sprintId ID du sprint
     * @param {any[]}  data     Données 
     * @return {Promise}
     */
    public addTask(sprintId: number, data: any): any
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
                    headers.append('Content-Type', 'application/x-www-form-urlencoded');

                    this.httpService.post(
                        `/users/${user.id}/sprints/${sprintId}/tasks`,
                        {data: JSON.stringify(data)},
                        {headers: headers},
                        true,
                        true)
                        .then((task: any) =>
                        {
                            resolve(task);
                        })
                        .catch(() =>
                        {
                            reject('add.task.error');
                        });
                }
                else
                {
                    reject('no.user');
                }
            }
            else
            {
                reject('token.error');
            }
        });
    }
}
