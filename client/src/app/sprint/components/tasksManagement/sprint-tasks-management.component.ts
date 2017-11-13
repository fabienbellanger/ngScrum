import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { TranslateService } from '@ngx-translate/core';

import { ApiTaskService } from '../../../api';
import { SprintTasksManagementService } from '../../services/sprint-tasks-management.service';
import { DateService } from '../../../shared';

@Component({
    selector:    'sa-sprint-tasks-management',
    templateUrl: './sprint-tasks-management.component.html',
})

export class SprintTasksManagementComponent implements OnInit
{
    public loading: boolean;
    public sprintId: number;
    public date: Date;

    /**
     * Constructeur
     *
     * @author Fabien Bellanger
     * @param {ApiTaskService}                  apiTaskService
     * @param {ActivatedRoute}                  route
     * @param {Router}                          router
     * @param {TranslateService}                translateService
     * @param {SprintTasksManagementService}    sprintTasksManagementService
     * @param {DateService}                     dateService
     */
    constructor(private apiTaskService: ApiTaskService,
                private route: ActivatedRoute,
                private router: Router,
                private translateService: TranslateService,
                private sprintTasksManagementService: SprintTasksManagementService,
                private dateService: DateService)
    {
    }

    /**
     * Initialisation du composant
     *
     * @author Fabien Bellanger
     */
    public ngOnInit(): void
    {
        this.loading = true;

        this.route.paramMap.subscribe((params: ParamMap) =>
        {
            // Récupération du sprint
            // ----------------------
            this.sprintId      = +params.get('sprintId');
            const date: string = params.get('date');

            // Initialisation
            // --------------
            this.init(date);
        });
    }

    /**
     * Initialisation du sprint
     *
     * @author Fabien Bellanger
     * @param {string} date Date
     */
    private init(date: string = null): void
    {
        // Initialisation du sprint
        // ------------------------
        this.sprintTasksManagementService.date = (date) ? date : this.sprintTasksManagementService.date;
        this.sprintTasksManagementService.init(this.sprintId)
            .then(() =>
            {
                this.date = this.dateService.toDate(this.sprintTasksManagementService.date);

                this.loading = false;
            })
            .catch(() =>
            {
                this.date = new Date();

                this.loading = false;
            });
    }

    /**
     * Suppression d'une tâche
     *
     * @author Fabien Bellanger
     * @param {number}  userId ID de l'utilisateur
     * @param {number}  taskId ID de la tâche
     */
    public removeTask(userId: number, taskId: number): void
    {
        this.apiTaskService.deleteTaskUser(this.sprintId, userId, taskId, this.dateService.toSqlDate(this.date))
            .then(() =>
            {
                alert('OK');
            })
            .catch(() =>
            {
                alert('KO');
            });
    }
}
