import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ToastyService } from 'ng2-toasty';
import { TranslateService } from '@ngx-translate/core';

import { ApiSprintService } from '../../api';
import { SprintService } from '../services/sprint.service';

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
     * @param {ApiSprintService}    apiSprintService
     * @param {ActivatedRoute}      route
     * @param {Router}              router
     * @param {ToastyService}       toastyService
     * @param {TranslateService}    translateService
     * @param {SprintService}       sprintService
     */
    constructor(private apiSprintService: ApiSprintService,
                private route: ActivatedRoute,
                private router: Router,
                private toastyService: ToastyService,
				private translateService: TranslateService,
                private sprintService: SprintService)
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
        // Remise à zéro du sprint
        // -----------------------
        this.sprintService.sprint = null;

        // Initialisation du sprint
        // ------------------------
        this.apiSprintService.getSprintInformation(this.sprintId)
            .then((sprint: any) =>
            {
                this.sprintService.init(sprint);
            })
            .catch(() =>
            {
                console.error('Error sprint information');
            });
    }
}
