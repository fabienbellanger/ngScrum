import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { TranslateService } from '@ngx-translate/core';

import { ApiTeamService } from '../../api';
import { ToolboxService } from '../../shared';
import { UserService } from '../../auth';

@Component({
    selector:    'sa-team-edit',
    templateUrl: './team-edit.component.html',
})

export class TeamEditComponent implements OnInit
{
    public loading: boolean = true;
    public title:   string;
    
    /**
     * Constructeur
     *
     * @author Fabien Bellanger
     * @param {ApiTeamService}    apiTeamService
     * @param {ToolboxService}    toolboxService
     * @param {TranslateService}  translateService
     * @param {UserService}       userService
     * @param {ActivatedRoute}    route
     */
    constructor(private apiTeamService: ApiTeamService,
                private toolboxService: ToolboxService,
                private translateService: TranslateService,
                private userService: UserService,
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
        const teamId: number = (isNaN(+this.route.snapshot.params['teamId'])) ? 0 : +this.route.snapshot.params['teamId'];

        // Titre
        // -----
        this.translateService.get([
            'create.team.title',
            'edit.team.title',
        ]).subscribe((translationObject: Object) =>
        {
            this.title = (teamId === 0) ? translationObject['create.team.title'] : translationObject['edit.team.title'];
        });

        // Requète pour récupérer les données
        // ----------------------------------
        this.loading = false;
    }
}
