import { Injectable } from '@angular/core';

import { StorageService, DateService, ToolboxService } from '../../shared';
import { Sprint, Task } from '../../models';

@Injectable()

export class SprintService
{
    public sprint: Sprint;
    public initialDuration: number;
    public addedDuration: number;
    public estimatedDuration: number;
    public remainingDuration: number;
    public workedDuration: number;
    public decrementedDuration: number;
    public averageWorkedHoursPerDay: number;
    public usersInformation: any;
    public usersTotalInformation: any;
    public diffEstimatedWorkedDuration: number;

    /**
     * Constructeur
     *
     * @author Fabien Bellanger
     * @param {StorageService} storageService
     * @param {DateService}    dateService
     * @param {ToolboxService} toolboxService
     */
    constructor(private storageService: StorageService,
                private dateService: DateService,
                private toolboxService: ToolboxService)
    {
        this.sprint                      = null;
        this.initialDuration             = 0;
        this.addedDuration               = 0;
        this.estimatedDuration           = 0;
        this.remainingDuration           = 0;
        this.workedDuration              = 0;
        this.decrementedDuration         = 0;
        this.diffEstimatedWorkedDuration = 0;
        this.averageWorkedHoursPerDay    = 7;
        this.usersInformation            = {};
        this.usersTotalInformation       = {};
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
        this.addedDuration               = this.getAddedDuration(true);
        this.estimatedDuration           = this.initialDuration + this.getDuration(true);
        this.remainingDuration           = this.getRemainigDuration();
        this.workedDuration              = this.getTotalTaskUserDuration(true);
        this.decrementedDuration         = this.getTotalTaskUserDuration(false);
        this.averageWorkedHoursPerDay    = this.getAverageWorkedHoursPerDay();
        this.usersInformation            = this.getUsersInformation();
        this.usersTotalInformation       = this.getUsersTotalInformation();
        this.diffEstimatedWorkedDuration = this.estimatedDuration - this.workedDuration;

        // Calcul de la durée travaillée des tâches
        // ----------------------------------------
        this.getTasksWorkedDuration();
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
            for (const task of this.sprint.tasks)
            {
                if (!!task.addedAfter === added)
                {
                    duration += +task.initialDuration;
                }
            }
        }

        return duration;
    }
    
    /**
     * Durée non prévue
     *
     * @author Fabien Bellanger
     * @param {boolean} worked Travaillée
     * @return {number} Durée
     */
    private getAddedDuration(worked: boolean = false): number
    {
        let duration: number = 0;
        
        if (this.sprint !== null)
        {
            for (const task of this.sprint.tasks)
            {
                if (task.list.length > 0)
                {
                    for (const taskUser of task.list)
                    {
                        if (!!task.addedAfter)
                        {
                            duration += (worked) ? +taskUser.workedDuration : +taskUser.duration;
                        }
                    }
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
            for (const task of this.sprint.tasks)
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
     * @param {boolean} worked Travaillée
     * @return {number} Durée
     */
    private getTotalTaskUserDuration(worked: boolean = false): number
    {
        let duration: number = 0;

        if (this.sprint !== null)
        {
            for (const task of this.sprint.tasks)
            {
                if (task.list.length > 0)
                {
                    for (const taskUser of task.list)
                    {
                        duration += (worked) ? +taskUser.workedDuration : +taskUser.duration;
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
            for (const task of this.sprint.tasks)
            {
                taskUserLength += task.list.length;
            }
        }

        return (taskUserLength !== 0)
            ? this.workedDuration / taskUserLength
            : 7;
    }

    /**
     * Retourne les informations sur les utilisateurs
     *
     * @author Fabien Bellanger
     * @return {any[]}
     */
    private getUsersInformation(): any[]
    {
        const informations: any = {};

        // Récupération des données
        // ------------------------
        if (this.sprint !== null)
        {
            for (const task of this.sprint.tasks)
            {
                if (task.list.length > 0)
                {
                    for (const taskUser of task.list)
                    {
                        // 1. Initialisation
                        // -----------------
                        if (!informations.hasOwnProperty(taskUser.userId))
                        {
                            informations[taskUser.userId] = {
                                name:           '',
                                duration:       0,
                                workedDuration: 0,
                                coefficient:    0,
                                performance:    0,
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
        for (const userId in informations)
        {
            if (informations.hasOwnProperty(userId))
            {
                if (this.sprint.users.hasOwnProperty(userId))
                {
                    informations[userId].name  = this.sprint.users[userId].firstname + ' ';
                    informations[userId].name += this.sprint.users[userId].lastname;
                }
                informations[userId].coefficient = (informations[userId].workedDuration !== 0)
                    ? informations[userId].duration / informations[userId].workedDuration
                    : 0;
                informations[userId].performance = informations[userId].coefficient * 100;
            }
        }

        // Conversion Object => Array
        // --------------------------
        const result: any[] = Object.keys(informations).map((k: any) => informations[k]);

        return result;
    }

    /**
     * Retourne les informations totales sur les utilisateurs
     *
     * @author Fabien Bellanger
     * @return {any}
     */
    private getUsersTotalInformation(): any
    {
        const total: any = {
            duration:       0,
            workedDuration: 0,
            coefficient:    0,
            performance:    0,
        };

        for (const user of this.usersInformation)
        {
            total.duration       += +user.duration;
            total.workedDuration += +user.workedDuration;
        }

        total.coefficient = (total.workedDuration !== 0) ? total.duration / total.workedDuration : 0;
        total.performance = total.coefficient * 100;

        return total;
    }

    /**
     * Calcul de la durée travaillée des tâches
     *
     * @author Fabien Bellanger
     */
    private getTasksWorkedDuration(): void
    {
        let duration: number;
        let task: Task;

        if (this.sprint !== null)
        {
            for (const taskIndex in this.sprint.tasks)
            {
                if (this.sprint.tasks.hasOwnProperty(taskIndex))
                {
                    task     = this.sprint.tasks[taskIndex];
                    duration = 0;

                    if (task.list.length > 0)
                    {
                        for (const taskUser of task.list)
                        {
                            duration += +taskUser.workedDuration;
                        }
                    }

                    this.sprint.tasks[taskIndex].workedDuration = duration;
                }
            }
        }
    }

    /**
     * Retourne la date de fin théorique du sprint
     *
     * @author Fabien Bellanger
     * @param {any} sprint Sprint
     * @return {string|null} Date de fin théorique du sprint ou null si la date ne peut être calculée
     */
    public getSprintEndDate(sprint: any): string|null
    {
        let dateEnd: any                        = this.dateService.now();
        const year: number                      = dateEnd.year();
        const decrementedDurationPerDay: number = +sprint.decrementedDurationPerDay;
        const remainingDuration: number         = +sprint.remainingDuration;
        const nbRemainingDays: number           = (decrementedDurationPerDay !== 0)
            ? Math.ceil(remainingDuration / decrementedDurationPerDay)
            : Infinity;

        if (nbRemainingDays === Infinity || isNaN(nbRemainingDays))
        {
            return null;
        }
        else
        {
            let remaingDay: number = nbRemainingDays;
            let loop: number       = 0;
            let nextDate: any;
            // Au max 5 jours non travaillés consécutifs
            const maxLoops: number = 5 * nbRemainingDays;

            while (!(remaingDay <= 0 || loop === maxLoops))
            {
                nextDate = dateEnd.add(1, 'days');

                if (this.dateService.isWorked(nextDate))
                {
                    remaingDay--;
                }

                loop++;
            }

            if (loop === maxLoops)
            {
                return null;
            }
            else
            {
                dateEnd = nextDate;
            }
        }

        return dateEnd.format('YYYY-MM-DD');
    }
}
