import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { TranslateService } from '@ngx-translate/core';

import { ApiTeamService } from '../../api';
import { ToolboxService } from '../../shared';

@Component({
    selector:    'sa-team-list',
    templateUrl: './team-list.component.html',
})

export class TeamListComponent implements OnInit
{
    public loading: boolean = true;
    public teams: any[]     = [];
    public users: any[]     = [];
    public usersIdName: any = {};
    public step: number     = -1;
    /**
     * Constructeur
     *
     * @author Fabien Bellanger
     * @param {ApiTeamService}    apiTeamService
     * @param {ToolboxService}    toolboxService
     * @param {TranslateService}  translateService
     */
    constructor(private apiTeamService: ApiTeamService,
                private toolboxService: ToolboxService,
                private translateService: TranslateService)
    {
    }

    /**
     * Initialisation du composant
     *
     * @author Fabien Bellanger
     */
    public ngOnInit(): void
    {
        // Requète pour récupérer les données
        // ----------------------------------
        this.loading = true;
        
        this.apiTeamService.getTeams()
            .then((result: any) =>
            {
                this.teams = result['teams'];
                this.users = result['users'];

                this.constructUsersIdName();

                this.loading = false;
            })
            .catch(() =>
            {
                console.error('Error teams data');

                this.loading = false;
            });
    }

    /**
     * Construction du tableau de correspondance ID <=> Nom
     * 
     * @author Fabien Béllanger
     */
    private constructUsersIdName(): void
    {
        for (const user of this.users)
        {
            this.usersIdName[user.id] = user.lastname + ' ' + user.firstname;
        }
    }

    public setStep(index: number): void
    {
        this.step = index;
    }
    
    public nextStep(): void
    {
        this.step++;
    }
    
    public prevStep(): void
    {
        this.step--;
    }
}
