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
    public usersNumber: number;
    public averageWorkedHoursPerDay: number;

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
        this.usersNumber                 = 0;
        this.averageWorkedHoursPerDay    = 7;
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
        this.usersNumber                 = this.getUsersNumber();
        this.averageWorkedHoursPerDay    = this.getAverageWorkedHoursPerDay();
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
     * Retourne le nombre d'utilisateurs participants au sprint
     *
     * @author Fabien Bellanger
     * @return {number} Nombre d'utilisateurs
     */
    private getUsersNumber(): number
    {
        let usersList: number[] = [];

        if (this.sprint !== null)
        {
            for (let task of this.sprint.tasks)
            {
                if (task.list.length > 0)
                {
                    for (let taskUser of task.list)
                    {
                        if (usersList.indexOf(taskUser.userId) === -1)
                        {
                            usersList.push(taskUser.userId);
                        }
                    }
                }
            }
        }

        return usersList.length;
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
}
