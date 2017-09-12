import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ToastyService } from 'ng2-toasty';
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
    private loading: boolean           = true;
    private data: any[]                = [];
    private users: any                 = {};
    private usersHeader: any[]         = [];
    private usersTotal: any            = {};
    private total: number              = 0;
    private sprintId: number;
    private sprint: any;

    /**
     * Constructeur
     *
     * @author Fabien Bellanger
     * @param {ApiSprintService}                apiSprintService
     * @param {ActivatedRoute}                  route
     * @param {Router}                          router
     * @param {ToastyService}                   toastyService
     * @param {TranslateService}                translateService
     * @param {SprintTasksManagementService}    sprintTasksManagementService
     * @param {ToolboxService}                  toolboxService
     */
    constructor(private apiSprintService: ApiSprintService,
                private route: ActivatedRoute,
                private router: Router,
                private toastyService: ToastyService,
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
        for (let user of this.sprint.users)
        {
            this.users[user.id] = user.firstname + ' ' + user.lastname.slice(0, 1) + '.';
            this.usersHeader.push({
                id:   user.id,
                name: this.users[user.id],
            });
            this.usersTotal[user.id] = 0;
        }

        // TasksUsers
        // ----------
        let date: string;
        let data: any = {};

        for (let taskUser of this.sprint.tasksUsers)
        {
            date = taskUser.date;

            if (!data.hasOwnProperty(date))
            {
                data[date] = {
                    date:  date,
                    users: {},
                };
            }

            if (!data[date].users.hasOwnProperty(taskUser.userId))
            {
                data[date].users[taskUser.userId] = {
                    duration:       0,
                    workedDuration: 0,
                };
            }

            data[date].users[taskUser.userId].duration += +taskUser.duration;
            data[date].users[taskUser.userId].workedDuration += +taskUser.workedDuration;

            // Totaux
            // ------
            this.usersTotal[taskUser.userId] += +taskUser.duration;
            this.total += +taskUser.duration;
        }

        // Tri et conversion de l'objet en tableau
        // ---------------------------------------
        this.data = this.toolboxService.objectToArray(this.toolboxService.ksort(data)).reverse();
    }
}
