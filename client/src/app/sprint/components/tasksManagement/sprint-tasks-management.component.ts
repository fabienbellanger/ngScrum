import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { ToastyService } from 'ng2-toasty';
import { TranslateService } from '@ngx-translate/core';

import { ApiSprintService } from '../../../api';
import { SprintTasksManagementService } from '../../services/sprint-tasks-management.service';

@Component({
    selector:    'sa-sprint-tasks-management',
    templateUrl: './sprint-tasks-management.component.html',
})

export class SprintTasksManagementComponent implements OnInit
{
    private loading: boolean = true;
    private sprintId: number;
 
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
     */
    constructor(private apiSprintService: ApiSprintService,
                private route: ActivatedRoute,
                private router: Router,
                private toastyService: ToastyService,
				private translateService: TranslateService,
                private sprintTasksManagementService: SprintTasksManagementService)
    {
    }

     /**
     * Initialisation du composant
     *
     * @author Fabien Bellanger
     */
    public ngOnInit(): void
    {
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
        this.sprintTasksManagementService.init(this.sprintId);
    }

    /**
     * Edition d'une tâche
     * 
     * @author Fabien Bellanger
     */
    private editTask(userId: number, taskId: number): void
    {
        alert(userId + ' - ' + taskId);
    }
}
