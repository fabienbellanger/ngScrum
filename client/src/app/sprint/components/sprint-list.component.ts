import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ApiSprintService } from '../../api';

@Component({
    selector:    'sa-sprint-list',
    templateUrl: './sprint-list.component.html',
})

export class SprintListComponent implements OnInit
{
    private sprints: any[]   = [];
    private loading: boolean = true;
    private state: string;

    /**
     * Constructeur
     *
     * @author Fabien Bellanger
     */
    constructor(private apiSprintService: ApiSprintService,
                private router: Router)
    {
    }

    /**
     * Initialisation du composant
     *
     * @author Fabien Bellanger
     */
    public ngOnInit(): void
    {
        this.getSprints(this.state);
    }

    /**
     * Liste des sprints
     *
     * @author Fabien Bellanger
     * @param {string} state Etat {all, inProgress, finished}
     */
    private getSprints(state: string): void
    {
        if (state !== 'all' && state !== 'inProgress' && state !== 'finished')
        {
            state = 'inProgress';
        }
        this.state = state;

        this.apiSprintService.getList(state)
            .then((sprints: any) =>
            {
                this.sprints = sprints;

                this.loading = false;
            })
            .catch(() =>
            {
                console.error('[error] Get sprints list');

                this.loading = false;
            });
    }

    /**
     * Redirection vers la gestion des tâches
     *
     * @author Fabien Bellanger
     * @param {number} sprintId ID du sprint
     */
    private redirectToTasksManagement(sprintId: number): void
    {
        this.router.navigate(['/sprints', sprintId, 'tasks']);
    }
}
