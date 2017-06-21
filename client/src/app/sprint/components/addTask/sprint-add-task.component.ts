import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ApiSprintService } from '../../../api';
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

    /**
     * Constructeur
     *
     * @author Fabien Bellanger
     * @param {ApiSprintService}    apiSprintService
     * @param {ActivatedRoute}      route
     * @param {SprintService}       sprintService
     */
    constructor(private apiSprintService: ApiSprintService,
                private route: ActivatedRoute,
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
        // Récupération de l'ID du sprint
        // ------------------------------
        this.sprintId = +this.route.snapshot.params['sprintId'];

		// Initialisation
		// --------------
		this.name = '';
    }

	/**
	 * Ajout d'une tâche
	 * 
	 * @author Fabien Bellanger
	 */
	private addTask(): void
	{
		alert('Add task');
	}
}
