import { Component, OnInit } from '@angular/core';

import { ApiSprintService } from '../../api';

@Component({
    selector:    'sa-sprint-parameters',
    templateUrl: './sprint-parameters.component.html',
})

export class SprintParametersComponent implements OnInit
{
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
        
    }
}
