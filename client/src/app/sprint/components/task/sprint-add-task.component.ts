import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ToastyService } from 'ng2-toasty';
import { TranslateService } from '@ngx-translate/core';

import { ApiSprintService } from '../../../api';
import { StorageService } from '../../../shared';
import { SprintService } from '../../services/sprint.service';

import { Task } from '../../../models';

@Component({
    selector:    'sa-sprint-add-task-info',
    templateUrl: './sprint-add-task.component.html',
})

export class SprintAddTaskComponent implements OnInit
{
	public sprintId: number;
	public name: string;
	public description: string;
    public duration: number;
    public applications: any[];
    public applicationsIds: any;
    public notPlanned: boolean;

    /**
     * Constructeur
     *
     * @author Fabien Bellanger
     * @param {ApiSprintService}    apiSprintService
     * @param {ActivatedRoute}      route
     * @param {SprintService}       sprintService
     * @param {StorageService}      storageService
     * @param {ToastyService}       toastyService
     * @param {Router}              router
     * @param {TranslateService}    translateService
     */
    constructor(private apiSprintService: ApiSprintService,
                private route: ActivatedRoute,
                private sprintService: SprintService,
                private storageService: StorageService,
                private toastyService: ToastyService,
                private router: Router,
				private translateService: TranslateService)
    {
    }

    /**
     * Initialisation du composant
     *
     * @author Fabien Bellanger
     */
    public ngOnInit(): void
    {
        // Récupération de l'ID du sprint
        // ------------------------------
        this.sprintId = +this.route.snapshot.params['sprintId'];

		// Initialisation
		// --------------
		this.name            = '';
		this.description     = '';
        this.duration        = null;
        this.notPlanned      = false;
        this.applications    = this.storageService.get('session', 'applications', []);
        this.applicationsIds = {};
    }

	/**
	 * Ajout d'une tâche
	 * 
	 * @author Fabien Bellanger
	 */
	private addTask(): void
	{
        // Conversion Object => Array
        // --------------------------
        let applicationsIdsSelected: number[] = Object.keys(this.applicationsIds)
                                                      .map((k: any) => this.applicationsIds[k]);

        // Requête
        // -------
        this.apiSprintService.addTask(this.sprintId, {
            name:            this.name,
            description:     this.description,
            duration:        this.duration,
            notPlanned:      +this.notPlanned,
            applicationsIds: applicationsIdsSelected,
        }).then((task: any) =>
        {
            // Notification
            // ------------
            this.translateService.get('add.task.success').subscribe((msg: string) =>
            {
                this.toastyService.success(msg);
            });

            // Redirection
            // -----------
            this.router.navigate(['/sprints/tasks', {sprintId: this.sprintId}]);
        })
        .catch((error: any) =>
        {
            // Notification
            // ------------
            this.translateService.get('add.task.error').subscribe((msg: string) =>
            {
                this.toastyService.error(msg);
            });
        });
	}
    
    /**
     * Sélection ou désélection d'une application
     *
     * @author Fabien Bellanger
     * @param {any)     event
     * @param {number}  index
     * @param {number}  applicationId
     */
    private toggleApplication(event: any, index: number, applicationId: number): void
    {
        const isApplicationPresent: boolean = (this.applicationsIds[index] !== undefined);

        if (event.target.checked && !isApplicationPresent)
        {
            this.applicationsIds[index] = applicationId;
        }
        else if (!event.target.checked && isApplicationPresent)
        {
            delete this.applicationsIds[index];
        }
    }
}
