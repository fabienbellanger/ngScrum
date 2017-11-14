import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

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
    public loading:       boolean  = true;
    public formSubmitted: boolean  = false;
    public users:         any[]    = [];
    public members:       number[] = [];
    public title:         string;
    public formGroup:     FormGroup;
    
    /**
     * Constructeur
     *
     * @author Fabien Bellanger
     * @param {ApiTeamService}    apiTeamService
     * @param {ToolboxService}    toolboxService
     * @param {TranslateService}  translateService
     * @param {UserService}       userService
     * @param {ActivatedRoute}    route
     * @param {MatSnackBar}       snackBar
     * @param {Router}            router
     */
    constructor(private apiTeamService: ApiTeamService,
                private toolboxService: ToolboxService,
                private translateService: TranslateService,
                private userService: UserService,
                private route: ActivatedRoute,
                private snackBar: MatSnackBar,
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
        
        // FormControls
        // ------------
        this.formGroup = new FormGroup({
            name:    new FormControl('', [
                Validators.required,
                Validators.maxLength(50),
            ]),
            ownerId: new FormControl(0, [
                Validators.required,
                Validators.min(1),
            ]),
        });

        // Requète pour récupérer les données
        // ----------------------------------
        this.apiTeamService.getEditInfo(teamId)
            .then((response: any) =>
            {
                this.users = response.users;
                if (teamId !== 0)
                {
                    this.formGroup.get('name').setValue(response.team.name);
                    this.formGroup.get('ownerId').setValue(response.team.ownerId);
                    this.members = response.team.members;
                }

                this.loading = false;
            })
            .catch(() =>
            {
                this.translateService.get(['get.data.error', 'error'])
                    .subscribe((translationObject: Object) =>
                    {
                        this.snackBar.open(
                            translationObject['get.data.error'],
                            translationObject['error'],
                            {
                                duration: 3000,
                            });
                    });

                // Redirection
                this.router.navigate(['/teams']);

                this.loading = false;
            });

    }

    /**
     * Soumission du formulaire
     *
     * @author Fabien Bellanger
     */
    public saveTeam(): void
    {

    }
}
