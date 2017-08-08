import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ToastyService } from 'ng2-toasty';
import { TranslateService } from '@ngx-translate/core';

import { ApiSprintService } from '../../../api';
import { SprintTasksManagementService } from '../../services/sprint-tasks-management.service';

@Component({
    selector:    'sa-sprint-tasks-management-edit',
    templateUrl: './sprint-tasks-management-edit.component.html',
})

export class SprintTasksManagementEditComponent implements OnInit
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
        // Récupération du sprint
        // ----------------------
        const sprintId: number = +this.route.snapshot.params['sprintId'];
        const userId: number = +this.route.snapshot.params['userId'];
        const taskId: number = +this.route.snapshot.params['taskId'];

        console.log(sprintId, userId, taskId);

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

    }
}
