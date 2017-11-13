import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatSnackBar } from '@angular/material';

import { TranslateService } from '@ngx-translate/core';

import { TeamDeleteDialogComponent } from './dialogs/team-delete-dialog.component';
import { ApiTeamService } from '../../api';
import { ToolboxService } from '../../shared';
import { UserService } from '../../auth';
import { log } from 'util';

@Component({
    selector:    'sa-team-list',
    templateUrl: './team-list.component.html',
})

export class TeamListComponent implements OnInit
{
    public loading:      boolean = true;
    public teams:        any[]   = [];
    public users:        any[]   = [];
    public usersIdName:  any     = {};
    public usersIdEmail: any     = {};
    public step:         number  = -1;

    /**
     * Constructeur
     *
     * @author Fabien Bellanger
     * @param {ApiTeamService}    apiTeamService
     * @param {ToolboxService}    toolboxService
     * @param {TranslateService}  translateService
     * @param {UserService}       userService
     * @param {MatDialog}         dialog
     * @param {MatSnackBar}       snackBar
     */
    constructor(private apiTeamService: ApiTeamService,
                private toolboxService: ToolboxService,
                private translateService: TranslateService,
                private userService: UserService,
                private dialog: MatDialog,
                private snackBar: MatSnackBar)
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
            this.usersIdName[user.id]  = user.lastname + ' ' + user.firstname;
            this.usersIdEmail[user.id] = user.email;
        }
    }

    /**
     * Initialisation de l'étape
     * 
     * @author Fabien Bellanger
     * @param {number} index 
     */
    public setStep(index: number): void
    {
        this.step = index;
    }
    
    /**
     * Etape suivante
     * 
     * @author Fabien Bellanger
     */
    public nextStep(): void
    {
        this.step++;
    }
    
    /**
     * Etape précédente
     * 
     * @author Fabien Bellanger
     */
    public prevStep(): void
    {
        this.step--;
    }
    
    /**
     * Suppression d'une équipe
     * 
     * @author Fabien Bellanger
     * @param {number} teamId ID de l'équipe
     */
    public deleteTeam(teamId: number): void
    {
        const dialog = this.dialog.open(TeamDeleteDialogComponent, {
            data: {
                confirm: true,
            },
            disableClose: false,
        });

        dialog.afterClosed().subscribe((result: any) =>
        {
            this.translateService.get([
                'delete.team.success',
                'delete.team.error',
                'error',
                'success',
            ]).subscribe((translationObject: Object) =>
            {
                if (result === true)
                {
                    console.log(result + ' - Team ID: ' + teamId);
                }
            });
        });
    }
}
