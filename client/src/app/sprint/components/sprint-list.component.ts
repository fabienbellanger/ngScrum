import { Component, OnInit } from '@angular/core';

import { ApiSprintService } from '../../api';

@Component({
    selector:    'sa-sprint-list',
    templateUrl: './sprint-list.component.html',
})

export class SprintListComponent
{
    public sprints: any[] = [];
    public state: string;

    /**
     * Constructeur
     *
     * @author Fabien Bellanger
     */
    constructor(private apiSprintService: ApiSprintService)
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
            })
            .catch(() =>
            {
                console.error('[error] Get sprints list');
            });
    }
}
