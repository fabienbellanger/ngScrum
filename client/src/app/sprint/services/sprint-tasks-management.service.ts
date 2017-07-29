import { Injectable } from '@angular/core';

@Injectable()

export class SprintTasksManagementService
{
    public sprint: any;
    public users: any[];

    /**
     * Constructeur
     *
     * @author Fabien Bellanger
     */
    constructor()
    {
    }

    /**
     * Initialisation
     *
     * @author Fabien Bellanger
     * @param {Sprint} sprint Sprint
     */
    public init(sprint: any): void
    {
        this.sprint = sprint;

        // Mise en place des structures de données
        // ---------------------------------------
        this.getUsersData();
    }

    /**
     * Mise en place du tableau des utilisateurs
     *
     * @author Fabien Bellanger
     */
    private getUsersData(): void
    {
        this.users             = [];
        let userIndex: number  = 0;
        let tasksIndex: number;
        let taskId: number;
        let task: any;

        // Utilisateurs
        // ------------
        for (let user of this.sprint.users)
        {
            this.users[userIndex]          = {};
            this.users[userIndex]['id']    = user.id;
            this.users[userIndex]['name']  = user.firstname + ' ' + user.lastname;
            this.users[userIndex]['tasks'] = {};

            // Tâches
            // ------
            tasksIndex = 0;
            for (let taskUser of this.sprint.tasksUsers)
            {
                taskId = taskUser.taskId;
                task   = this.sprint.tasks[taskId];

                // On prend les tâches non terminées de l'utilisateur
                // --------------------------------------------------
                if (taskUser.userId === user.id && task !== undefined && task.remainingDuration !== 0)
                {
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
                        this.users[userIndex]['tasks'][taskId]['duration']          = taskUser.duration;
                        this.users[userIndex]['tasks'][taskId]['workedDuration']    = taskUser.workedDuration;
                    }
                    else
                    {
                        // Mise à jour des données
                        // -----------------------
                        this.users[userIndex]['tasks'][taskId]['duration']       += taskUser.duration;
                        this.users[userIndex]['tasks'][taskId]['workedDuration'] += taskUser.workedDuration;
                    }
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
