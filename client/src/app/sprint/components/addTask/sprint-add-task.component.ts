import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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
     */
    constructor(private apiSprintService: ApiSprintService,
                private route: ActivatedRoute,
                private sprintService: SprintService,
                private storageService: StorageService)
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

        console.log(
            this.name,
            this.description,
            this.duration,
            this.notPlanned,
            applicationsIdsSelected
        );
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
