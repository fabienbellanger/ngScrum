import { Injectable } from '@angular/core';

import { StorageService } from '../../shared/services/storage.service';
import { ApiSprintService } from '../../api/services/api-sprint.service';

@Injectable()

export class SprintTasksManagementService
{
    public sprint: any;
    public users: any[];
    public date: string;

    /**
     * Constructeur
     *
     * @author Fabien Bellanger
     * @param {ApiSprintService} apiSprintService
     * @param {StorageService}   storageService
     */
    constructor(private apiSprintService: ApiSprintService,
                private storageService: StorageService)
    {
    }

    /**
     * Initialisation
     *
     * @author Fabien Bellanger
     * @param {Number} sprintId ID du sprint
     * @return {Promise}
     */
    public init(sprintId: number): any
    {
        return new Promise((resolve: any, reject: any) =>
        {
            // Initialisation du sprint
            // ------------------------
            this.apiSprintService.getSprintManagement(sprintId)
                .then((sprint: any) =>
                {
                    this.sprint = sprint;
                    this.date   = this.date || sprint.date;

                    // Mise en place des structures de données
                    // ---------------------------------------
                    this.getUsersData();

                    resolve();
                })
                .catch((error: any) =>
                {
                    console.error('Error sprint information');
                    console.error(error);

                    reject(error);
                });
        });
    }

    /**
     * Mise en place du tableau des utilisateurs
     *
     * @author Fabien Bellanger
     */
    public getUsersData(): void
    {
        let userIndex: number;
        let tasksIndex: number;
        let taskId: number;
        let task: any;

        this.users = [];
        userIndex  = 0;

        // Utilisateurs
        // ------------
        for (const user of this.sprint.users)
        {
            this.users[userIndex]          = {};
            this.users[userIndex]['id']    = user.id;
            this.users[userIndex]['name']  = user.firstname + ' ' + user.lastname;
            this.users[userIndex]['tasks'] = {};

            // Tâches
            // ------
            tasksIndex = 0;
            for (const taskUser of this.sprint.tasksUsers)
            {
                taskId = taskUser.taskId;
                task   = this.sprint.tasks[taskId];

                // On prend les tâches non terminées de l'utilisateur
                // --------------------------------------------------
                if (taskUser.userId === user.id && task !== undefined) // && task.remainingDuration !== 0)
                {
                    console.log(taskUser);
                    if (!this.users[userIndex]['tasks'].hasOwnProperty(taskId))
                    {
                        // Nouvelle tâche
                        // --------------
                        this.users[userIndex]['tasks'][taskId]                      = {};
                        this.users[userIndex]['tasks'][taskId]['id']                = taskId;
                        this.users[userIndex]['tasks'][taskId]['name']              = task.name;
                        this.users[userIndex]['tasks'][taskId]['description']       = task.description;
                        this.users[userIndex]['tasks'][taskId]['initialDuration']   = task.initialDuration;
                        this.users[userIndex]['tasks'][taskId]['remainingDuration'] = task.remainingDuration;
                        if (this.date === taskUser.date)
                        {
                            this.users[userIndex]['tasks'][taskId]['duration']       = taskUser.duration;
                            this.users[userIndex]['tasks'][taskId]['workedDuration'] = taskUser.workedDuration;
                        }
                        else
                        {
                            this.users[userIndex]['tasks'][taskId]['duration']       = 0;
                            this.users[userIndex]['tasks'][taskId]['workedDuration'] = 0;
                        }
                    }
                    else if (this.date === taskUser.date)
                    {
                        // Mise à jour des données
                        // -----------------------
                        this.users[userIndex]['tasks'][taskId]['duration']       += taskUser.duration;
                        this.users[userIndex]['tasks'][taskId]['workedDuration'] += taskUser.workedDuration;
                    }
                    this.users[userIndex]['tasks'][taskId]['difference']  = this.users[userIndex]['tasks'][taskId]['duration']
                        - this.users[userIndex]['tasks'][taskId]['workedDuration'];
                    this.users[userIndex]['tasks'][taskId]['performance'] = (this.users[userIndex]['tasks'][taskId]['workedDuration'] !== 0)
                        ? (this.users[userIndex]['tasks'][taskId]['duration'] / this.users[userIndex]['tasks'][taskId]['workedDuration']) * 100
                        : 0;
                }
            }

            // Conversion Object => Array
            // --------------------------
            this.users[userIndex]['tasks'] = Object.keys(this.users[userIndex]['tasks'])
                                                   .map((i: any) => this.users[userIndex]['tasks'][i]);

            userIndex++;
        }
    }
}
