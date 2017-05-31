import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ApiSprintService } from '../../api';
import { Sprint } from '../../models';

@Component({
    selector:    'sa-sprint-info',
    templateUrl: './sprint-info.component.html',
})

export class SprintInfoComponent implements OnInit
{
    public sprint: Sprint;

    /**
     * Constructeur
     *
     * @author Fabien Bellanger
     */
    constructor(private apiSprintService: ApiSprintService,
                private route: ActivatedRoute)
    {
    }

    /**
     * Initialisation du composant
     *
     * @author Fabien Bellanger
     */
    public ngOnInit(): void
    {
        const sprintId: number = +this.route.snapshot.params['sprintId'];

        this.apiSprintService.getSprintInformation(sprintId)
            .then((sprint: any) =>
            {
                this.sprint = sprint;
            })
            .catch(() =>
            {
                console.error('Error sprint info');
            });
    }
}
