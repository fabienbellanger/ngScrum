import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ApiSprintService } from '../../api';
import { UserService } from '../../auth';

@Component({
    selector:    'sa-sprint-parameters',
    templateUrl: './sprint-parameters.component.html',
})

export class SprintParametersComponent implements OnInit
{
    private sprint: any;
    private loading: boolean = true;

    /**
     * Constructeur
     *
     * @author Fabien Bellanger
     * @param {ApiSprintService}    apiSprintService
     * @param {ActivatedRoute}      route
     * @param {UserService}         userService
     */
    constructor(private apiSprintService: ApiSprintService,
                private route: ActivatedRoute,
                private userService: UserService)
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
        
        this.sprint = {};
        this.apiSprintService.getSprintParameters(sprintId)
            .then((response: any) =>
            {
                this.sprint = response;

                this.loading = false;
            })
            .catch(() =>
            {
                console.log('Error: Get Sprint Parameters');                

                this.loading = false;
            });
    }

    /**
     * Enregistrement des paramètres
     * 
     * @author Fabien Bellanger
     */
    private saveParameters(): void
    {
        alert('Save parameters');
    }
}
