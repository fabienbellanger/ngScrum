import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ApiSprintService } from '../../api';

@Component({
    selector:    'sa-sprint-list',
    templateUrl: './sprint-list.component.html',
})

export class SprintListComponent implements OnInit
{
    public sprints: any[]   = [];
    public loading: boolean = true;
    public state: string;

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
    public getSprints(state: string): void
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
     * @param {any} sprint Sprint
     */
    public redirectToTasksManagement(sprint: any): void
    {
        if (sprint.initialDuration !== null)
        {
            this.router.navigate(['/sprints', sprint.id, 'tasks-management-list']);
        }
    }

    /**
     * Suppression d'un sprint
     *
     * @author Fabien Bellanger
     * @param {any} sprint Sprint
     */
    public deleteSprint(sprint: any): void
    {
        alert('Delete sprint ' + sprint.name);
    }
}
