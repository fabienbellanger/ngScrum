import { Injectable } from '@angular/core';

import { StorageService } from '../../shared';
import { Sprint } from '../../models';

@Injectable()

export class SprintService
{
    public sprint: Sprint;
    public initialDuration: number;
    public addedDuration: number;
    public totalDuration: number;
    public remainingDuration: number;
    public totalTaskUserWorkedDuration: number;
    public totalTaskUserDuration: number;
    public averageWorkedHoursPerDay: number;
    public usersInformation: any;

    /**
     * Constructeur
     *
     * @author Fabien Bellanger
     * @param {StorageService} storageService
     */
    constructor(private storageService: StorageService)
    {
        this.sprint                      = null;
        this.initialDuration             = 0;
        this.addedDuration               = 0;
        this.totalDuration               = 0;
        this.remainingDuration           = 0;
        this.totalTaskUserWorkedDuration = 0;
        this.totalTaskUserDuration       = 0;
        this.averageWorkedHoursPerDay    = 7;
        this.usersInformation            = {};
    }

    /**
     * Initialisation
     *
     * @author Fabien Bellanger
     * @param {Sprint} sprint Sprint
     */
    public init(sprint: Sprint): void
    {
        this.sprint                      = sprint;
        this.initialDuration             = this.getDuration(false);
        this.addedDuration               = this.getDuration(true);
        this.totalDuration               = this.initialDuration + this.addedDuration;
        this.remainingDuration           = this.getRemainigDuration();
        this.totalTaskUserWorkedDuration = this.getTotalTaskUserDuration(true);
        this.totalTaskUserDuration       = this.getTotalTaskUserDuration(false);
        this.averageWorkedHoursPerDay    = this.getAverageWorkedHoursPerDay();
        this.usersInformation            = this.getUsersInformation();
    }

    /**
     * Retourne une durée
     *
     * @author Fabien Bellanger
     * @param {boolean} added Tâches non prévues
     * @return {number} Durée
     */
    private getDuration(added: boolean): number
    {
        let duration: number = 0;

        if (this.sprint !== null)
        {
            for (let task of this.sprint.tasks)
            {
                if (task.addedAfter == added)
                {
                    duration += +task.initialDuration;
                }
            }
        }

        return duration;
    }

    /**
     * Retourne la durée restante
     *
     * @author Fabien Bellanger
     * @return {number} Durée
     */
    private getRemainigDuration(): number
    {
        let duration: number = 0;

        if (this.sprint !== null)
        {
            for (let task of this.sprint.tasks)
            {
                duration += +task.remainingDuration;
            }
        }

        return duration;
    }

    /**
     * Retourne la durée totales des tâches réalisées par les utilisateurs
     *
     * @author Fabien Bellanger
     * @param {boolean} worked Travaillées
     * @return {number} Durée
     */
    private getTotalTaskUserDuration(worked: boolean = false): number
    {
        let duration: number = 0;

        if (this.sprint !== null)
        {
            for (let task of this.sprint.tasks)
            {
                if (task.list.length > 0)
                {
                    for (let taskUser of task.list)
                    {
                        if (worked)
                        {
                            duration += +taskUser.workedDuration;
                        }
                        else
                        {
                            duration += +taskUser.duration;
                        }
                    }
                }
            }
        }

        return duration;
    }

    /**
     * Moyenne des heures travaillées
     *
     * @author Fabien Bellanger
     * @return {number} Moyenne des heures travaillées
     */
    private getAverageWorkedHoursPerDay(): number
    {
        let taskUserLength: number = 0;

        if (this.sprint !== null)
        {
            for (let task of this.sprint.tasks)
            {
                taskUserLength += task.list.length;
            }
        }

        return (taskUserLength !== 0)
            ? this.totalTaskUserWorkedDuration / taskUserLength
            : 7;
    }

    /**
     * Retourne les informations sur les utilisateurs
     *
     * @author Fabien Bellanger
     * @return {any[]} Durée
     */
    private getUsersInformation(): any[]
    {
        let informations: any = {};

        // Récupération des données
        // ------------------------
        if (this.sprint !== null)
        {
            for (let task of this.sprint.tasks)
            {
                if (task.list.length > 0)
                {
                    for (let taskUser of task.list)
                    {
                        // 1. Initialisation
                        // -----------------
                        if (!informations.hasOwnProperty(taskUser.userId))
                        {
                            informations[taskUser.userId] = {
                                name:           '',
                                duration:       0,
                                workedDuration: 0,
                                coef:           0,
                                perf:           0,
                                tasks:          0,
                            };
                        }

                        // 2. Construction
                        // ---------------
                        informations[taskUser.userId].duration       += +taskUser.duration;
                        informations[taskUser.userId].workedDuration += +taskUser.workedDuration;
                        informations[taskUser.userId].tasks++;
                    }
                }
            }
        }

        // Calcul des coéfficiants et des performances
        // -------------------------------------------
        for (let userId in informations)
        {
            if (this.sprint.users.hasOwnProperty(userId))
            {
                informations[userId].name = this.sprint.users[userId].firstname + ' ' + this.sprint.users[userId].lastname;
            }
            informations[userId].coef = informations[userId].duration / informations[userId].workedDuration;
            informations[userId].perf = informations[userId].coef * 100;
        }

        // Conversion Object => Array
        // --------------------------
        let result: any[] = Object.keys(informations).map((k: any) => informations[k]);

        return result;
    }
}
