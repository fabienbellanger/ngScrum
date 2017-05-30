import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { ApiSprintService } from '../../api';

@Component({
    selector:    'sa-sprint-info',
    templateUrl: './sprint-info.component.html',
})

export class SprintInfoComponent implements OnInit
{
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

        console.log(sprintId);
    }
}
