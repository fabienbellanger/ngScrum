import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { TranslateService } from '@ngx-translate/core';

import { ApiSprintService } from '../../../api';
import { ToolboxService } from '../../../shared';
import { SprintTasksManagementService } from '../../services/sprint-tasks-management.service';

@Component({
    selector:    'sa-sprint-tasks-management-list',
    templateUrl: './sprint-tasks-management-list.component.html',
})

export class SprintTasksManagementListComponent implements OnInit
{
    public data: any[]                = [];
    public users: any                 = {};
    public usersHeader: any[]         = [];
    public usersTotal: any            = {};
    public loading: boolean;
    public totalDuration: number;
    public totalWorkedDuration: number;
    public totalPerformance: number;
    public sprintId: number;
    public sprint: any;

    /**
     * Constructeur
     *
     * @author Fabien Bellanger
     * @param {ApiSprintService}                apiSprintService
     * @param {ActivatedRoute}                  route
     * @param {Router}                          router
     * @param {TranslateService}                translateService
     * @param {SprintTasksManagementService}    sprintTasksManagementService
     * @param {ToolboxService}                  toolboxService
     */
    constructor(private apiSprintService: ApiSprintService,
                private route: ActivatedRoute,
                private router: Router,
                private translateService: TranslateService,
                private sprintTasksManagementService: SprintTasksManagementService,
                private toolboxService: ToolboxService)
    {
    }

    /**
     * Initialisation du composant
     *
     * @author Fabien Bellanger
     */
    public ngOnInit(): void
    {
        // Initialisation des variables
        // ----------------------------
        this.sprintId = +this.route.snapshot.params['sprintId'];

        // Initialisation
        // --------------
        this.init();
    }

    /**
     * Initialisation du sprint
     *
     * @author Fabien Bellanger
     */
    private init(): void
    {
        this.loading             = true;
        this.totalDuration       = 0;
        this.totalWorkedDuration = 0;
        this.totalPerformance    = 0;

        // Initialisation du sprint
        // ------------------------
        this.sprintTasksManagementService.init(this.sprintId)
            .then(() =>
            {
                this.sprint = this.sprintTasksManagementService.sprint;

                // Mise en forme des données
                // -------------------------
                this.prepareData();

                this.loading = false;
            })
            .catch(() =>
            {
                this.loading = false;
            });
    }

    /**
     * Mise en forme des données et des utilisateurs
     *
     * @author Fabien Bellanger
     */
    private prepareData(): void
    {
        // Users
        // -----
        for (const user of this.sprint.users)
        {
            this.users[user.id] = user.firstname + ' ' + user.lastname.slice(0, 1) + '.';
            this.usersHeader.push({
                id:   user.id,
                name: this.users[user.id],
            });
            this.usersTotal[user.id] = {
                duration:       0,
                workedDuration: 0,
                performance:    0,
                show:           false,
            };
        }

        // TasksUsers
        // ----------
        let date: string;
        const data: any = {};

        for (const taskUser of this.sprint.tasksUsers)
        {
            date = taskUser.date;

            if (!data.hasOwnProperty(date))
            {
                data[date] = {
                    date:           date,
                    users:          {},
                    duration:       0,
                    workedDuration: 0,
                    performance:    0,
                };
            }

            if (!data[date].users.hasOwnProperty(taskUser.userId))
            {
                data[date].users[taskUser.userId] = {
                    duration:       0,
                    workedDuration: 0,
                    performance:    0,
                };
            }

            data[date].duration                              += +taskUser.duration;
            data[date].workedDuration                        += +taskUser.workedDuration;
            data[date].users[taskUser.userId].duration       += +taskUser.duration;
            data[date].users[taskUser.userId].workedDuration += +taskUser.workedDuration;
            data[date].users[taskUser.userId].performance     = (data[date].users[taskUser.userId].workedDuration !== 0)
                ? (data[date].users[taskUser.userId].duration / data[date].users[taskUser.userId].workedDuration) * 100
                : 0;

            // Totaux
            // ------
            this.usersTotal[taskUser.userId].show           = true;
            this.usersTotal[taskUser.userId].duration       += +taskUser.duration;
            this.usersTotal[taskUser.userId].workedDuration += +taskUser.workedDuration;
            this.totalDuration                              += +taskUser.duration;
            this.totalWorkedDuration                        += +taskUser.workedDuration;
        }

        // Calcul des performances totales
        // -------------------------------

        // 1. Total
        // --------
        this.totalPerformance = (this.totalWorkedDuration !== 0)
            ? (this.totalDuration / this.totalWorkedDuration) * 100
            : 0;

        // 2. Performance par date
        // -----------------------
        for (const d in data)
        {
            if (data.hasOwnProperty(d))
            {
                data[d].performance = (data[d].workedDuration !== 0)
                    ? (data[d].duration / data[d].workedDuration) * 100
                    : 0;
            }
        }

        // 3. Performance par utilisateur
        // ------------------------------
        for (const userId in this.usersTotal)
        {
            if (this.usersTotal.hasOwnProperty(userId))
            {
                this.usersTotal[userId].performance  = (this.usersTotal[userId].workedDuration !== 0)
                    ? (this.usersTotal[userId].duration / this.usersTotal[userId].workedDuration) * 100
                    : 0;
            }
        }

        // Tri et conversion de l'objet en tableau
        // ---------------------------------------
        this.data = this.toolboxService.objectToArray(this.toolboxService.ksort(data)).reverse();
    }

    /**
     * Edition d'une journée
     *
     * @author Fabien Bellanger
     * @param {string} date
     */
    public editDay(date: string = undefined): void
    {
        this.sprintTasksManagementService.date = date;

        this.router.navigate(['/sprints', this.sprintId, 'tasks-management']);
    }
}
