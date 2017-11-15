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
    public usersIds:      any      = {};
    public title:         string;
    public buttonTitle:   string;
    public formGroup:     FormGroup;
    public teamId:        number;
    
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
        this.teamId = (isNaN(+this.route.snapshot.params['teamId'])) ? 0 : +this.route.snapshot.params['teamId'];

        // Titre
        // -----
        this.translateService.get([
            'create.team.title',
            'edit.team.title',
            'create',
            'modify',
        ]).subscribe((translationObject: Object) =>
        {
            this.title       = (this.teamId === 0) ? translationObject['create.team.title'] : translationObject['edit.team.title'];
            this.buttonTitle = (this.teamId === 0) ? translationObject['create'] : translationObject['modify'];
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
        this.apiTeamService.getEditInfo(this.teamId)
            .then((response: any) =>
            {
                this.users = response.users;
                if (this.teamId !== 0)
                {
                    this.formGroup.get('name').setValue(response.team.name);
                    this.formGroup.get('ownerId').setValue(response.team.ownerId);

                    const userIds: number[] = response.team.members;
                    this.usersIds           = {};
                    for (const userIndex in this.users)
                    {
                        if (userIds.indexOf(this.users[userIndex].id) !== -1)
                        {
                            this.usersIds[userIndex] = this.users[userIndex].id;
                        }
                    }
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
        // Conversion Object => Array
        // --------------------------
        const usersIdsSelected: number[] = this.toolboxService.objectToArray(this.usersIds);

        if (!this.formSubmitted)
        {
            // Jeton pour n'avoir qu'une soumission
            // ------------------------------------
            this.formSubmitted = true;

            if (this.teamId === 0)
            {
                // Création
                // --------
                this.addTeam(usersIdsSelected);
            }
            else
            {
                // Modification
                // ------------
                this.modifyTeam(usersIdsSelected);
            }
        }
    }

    /**
     * Ajout d'une équipe
     *
     * @author Fabien Bellanger
     * @param {number[]} usersIdsSelected Tableau d'ID des utilisateurs sélectionnés
     */
    private addTeam(usersIdsSelected: number[]): void
    {
        this.apiTeamService.addTeam({
            name:     this.formGroup.get('name').value,
            ownerId:  this.formGroup.get('ownerId').value,
            usersIds: usersIdsSelected,
        })
            .then((response: any) =>
            {
                // Notification
                // ------------
                this.translateService.get(['add.team.success', 'success'])
                    .subscribe((translationObject: Object) =>
                    {
                        this.snackBar.open(
                            translationObject['add.team.success'],
                            translationObject['success'],
                            {
                                duration: 3000,
                            });
                    });

                // Redirection
                // -----------
                this.router.navigate(['/teams']);

                // Jeton pour n'avoir qu'une soumission
                // ------------------------------------
                this.formSubmitted = false;
            })
            .catch((error: any) =>
            {
                // Notification
                // ------------
                this.translateService.get(['add.team.error', 'error'])
                    .subscribe((translationObject: Object) =>
                    {
                        this.snackBar.open(
                            translationObject['add.team.error'],
                            translationObject['error'],
                            {
                                duration: 3000,
                            });
                    });

                // Jeton pour n'avoir qu'une soumission
                // ------------------------------------
                this.formSubmitted = false;
            });
    }

    /**
     * Modification d'une équipe
     *
     * @author Fabien Bellanger
     * @param {number[]} usersIdsSelected Tableau d'ID des utilisateurs sélectionnés
     */
    private modifyTeam(usersIdsSelected: number[]): void
    {
        this.apiTeamService.modifyTeam(this.teamId, {
            name:     this.formGroup.get('name').value,
            ownerId:  this.formGroup.get('ownerId').value,
            usersIds: usersIdsSelected,
        })
            .then((task: any) =>
            {
                // Notification
                // ------------
                this.translateService.get(['modify.team.success', 'success'])
                    .subscribe((translationObject: Object) =>
                    {
                        this.snackBar.open(
                            translationObject['modify.team.success'],
                            translationObject['success'],
                            {
                                duration: 3000,
                            });
                    });

                // Redirection
                // -----------
                this.router.navigate(['/teams']);

                // Jeton pour n'avoir qu'une soumission
                // ------------------------------------
                this.formSubmitted = false;
            })
            .catch((error: any) =>
            {
                // Notification
                // ------------
                this.translateService.get(['modify.team.error', 'error'])
                    .subscribe((translationObject: Object) =>
                    {
                        this.snackBar.open(
                            translationObject['modify.team.error'],
                            translationObject['error'],
                            {
                                duration: 3000,
                            });
                    });

                // Jeton pour n'avoir qu'une soumission
                // ------------------------------------
                this.formSubmitted = false;
            });
    }
    
    /**
     * Sélection ou désélection d'un utilisateur
     *
     * @author Fabien Bellanger
     * @param {any)     event
     * @param {number}  index
     * @param {number}  userId
     */
    private toggleUser(event: any, index: number, userId: number): void
    {
        const isApplicationPresent: boolean = (this.usersIds[index] !== undefined);

        if (event.checked && !isApplicationPresent)
        {
            this.usersIds[index] = userId;
        }
        else if (!event.checked && isApplicationPresent)
        {
            delete this.usersIds[index];
        }
    }
}
