import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';

import { HttpService, StorageService } from '../../shared';
import { User } from '../../models/user';

@Injectable()

export class ApiTaskService
{
    /**
     * Constructeur
     *
     * @author Fabien Bellanger
     * @param {HttpService}       httpService
     * @param {StorageService}    storageService
     */
    constructor(private httpService: HttpService,
                private storageService: StorageService)
    {
    }

    /**
     * Modification d'une TaskUser
     *
     * @author Fabien Bellanger
     * @param {number} sprintId ID du sprint
     * @param {number} taskId   ID de la tâche
     * @param {any[]}  data     Données
     * @return {Promise}
     */
    public editTaskUser(sprintId: number, taskId: number, data: any, isEdit: boolean): any
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
                    // 3. Requête
                    // ----------
                    const headers: any = new Headers();
                    headers.append('Authorization', 'Bearer ' + token);
                    headers.append('Content-Type', 'application/x-www-form-urlencoded');

                    if (isEdit)
                    {
                        // Modification
                        // ------------
                        this.httpService.put(`/users/${user.id}/sprints/${sprintId}/tasks/${taskId}/task-user`,
                            {data: JSON.stringify(data)},
                            {headers: headers},
                            true,
                            true)
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
                        // Création
                        // --------
                        this.httpService.post(`/users/${user.id}/sprints/${sprintId}/tasks/${taskId}/task-user`,
                            {data: JSON.stringify(data)},
                            {headers: headers},
                            true,
                            true)
                            .then((sprint: any) =>
                            {
                                resolve(sprint);
                            })
                            .catch(() =>
                            {
                                reject();
                            });
                    }
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
     * Suppression d'une task-user
     *
     * @author Fabien Bellanger
     * @param {number} sprintId ID du sprint
     * @param {number} userId   ID de l'utilisateur
     * @param {number} taskId   ID de la tâche
     * @param {string} date     Date
     * @return {Promise}
     */
    public deleteTaskUser(sprintId: number, userId: number, taskId: number, date: string): Promise<any>
    {
        return new Promise((resolve: any, reject: any) =>
        {
            // 1. Récupération du token
            // ------------------------
            const token: string = this.storageService.get('session', 'token', null);

            if (token != null)
            {
                // 2. Tests
                // --------
                if (userId !== 0 && taskId !== 0 && date)
                {
                    // 3. Requête
                    // ----------
                    const headers: any = new Headers();
                    headers.append('Authorization', 'Bearer ' + token);
                    headers.append('Content-Type', 'application/x-www-form-urlencoded');

                    this.httpService.delete(
                        `/users/${userId}/sprints/${sprintId}/tasks/${taskId}/task-user/${date}`,
                        {headers: headers},
                        true,
                        true)
                        .then(() =>
                        {
                            resolve();
                        })
                        .catch(() =>
                        {
                            reject('delete.sprint.error');
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
