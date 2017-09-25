import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { TranslateService } from '@ngx-translate/core';

import { ApiSprintService } from '../../../api';
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
     * @param {ApiSprintService}                apiSprintService
     * @param {ActivatedRoute}                  route
     * @param {Router}                          router
     * @param {TranslateService}                translateService
     * @param {SprintTasksManagementService}    sprintTasksManagementService
     * @param {DateService}                     dateService
     */
    constructor(private apiSprintService: ApiSprintService,
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
            this.sprintId = +params.get('sprintId');

            // Initialisation
            // --------------
            this.init();
        });
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
     * Edition d'une tâche
     *
     * @author Fabien Bellanger
     */
    public editTask(userId: number, taskId: number): void
    {
        alert(userId + ' - ' + taskId);
    }
}
