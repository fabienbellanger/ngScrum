import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

import { TranslateService } from '@ngx-translate/core';

import { ApiSprintService } from '../../api';
import { UserService } from '../../auth';
import { DateService } from '../../shared';

@Component({
    selector:    'sa-sprint-parameters',
    templateUrl: './sprint-parameters.component.html',
})

export class SprintParametersComponent implements OnInit
{
    public sprint: any;
    public usersInSprint: any[];
    public usersNotInSprint: any[];
    public parametersFormGroup: FormGroup;
    public loading: boolean       = true;
    public userIndexToAdd: number = -1;
    public formSubmitted: boolean = false;

    /**
     * Constructeur
     *
     * @author Fabien Bellanger
     * @param {ApiSprintService}    apiSprintService
     * @param {ActivatedRoute}      route
     * @param {Router}              router
     * @param {UserService}         userService
     * @param {MatSnackBar}         snackBar
     * @param {TranslateService}    translateService
     * @param {DateService}         dateService
     */
    constructor(private apiSprintService: ApiSprintService,
                private route: ActivatedRoute,
                private router: Router,
                private userService: UserService,
                private snackBar: MatSnackBar,
                private translateService: TranslateService,
                private dateService: DateService)
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

        this.sprint           = {};
        this.usersInSprint    = [];
        this.usersNotInSprint = [];

        // FormControls
        // ------------
        this.parametersFormGroup = new FormGroup({
            name:      new FormControl('', [
                Validators.required,
                Validators.maxLength(50),
            ]),
            startedAt: new FormControl('', [
                Validators.required,
            ]),
        });

        this.apiSprintService.getSprintParameters(sprintId)
            .then((response: any) =>
            {
                this.sprint = response;

                this.parametersFormGroup.get('name').setValue(this.sprint.name);
                this.parametersFormGroup.get('startedAt').setValue(this.sprint.startedAt);

                // Initialisation du tri des utilisateurs (présent ou non dans le sprint)
                // ----------------------------------------------------------------------
                this.initSortUsers();

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
    public saveParameters(): void
    {
        const data: any = {
            'name':      this.parametersFormGroup.get('name').value,
            'startedAt': this.dateService.toSqlDate(this.parametersFormGroup.get('startedAt').value),
            'usersId':   this.usersInSprint.map(element => element.id),
        };

        if (data.usersId.length === 0)
        {
            this.translateService.get(['at.least.one.user.must.be.enter', 'error'])
                .subscribe((translationObject: Object) =>
                {
                    this.snackBar.open(
                        translationObject['at.least.one.user.must.be.enter'],
                        translationObject['error'],
                        {
                            duration: 3000,
                        });
                });
        }
        else
        {
            if (!this.formSubmitted)
            {
                // Jeton pour n'avoir qu'une soumission
                // ------------------------------------
                this.formSubmitted = true;

                this.apiSprintService.modifySprintParameters(this.sprint.id, data)
                    .then((response: any) =>
                    {
                        // Notification
                        // ------------
                        this.translateService.get(['modify.sprint.parameters.success', 'success'])
                            .subscribe((translationObject: Object) =>
                            {
                                this.snackBar.open(
                                    translationObject['modify.sprint.parameters.success'],
                                    translationObject['success'],
                                    {
                                        duration: 3000,
                                    });
                            });

                        // Redirection
                        // -----------
                        this.router.navigate(['/sprints']);

                        // Jeton pour n'avoir qu'une soumission
                        // ------------------------------------
                        this.formSubmitted = false;
                    })
                    .catch(() =>
                    {
                        // Notification
                        // ------------
                        this.translateService.get(['modify.sprint.parameters.error', 'error'])
                            .subscribe((translationObject: Object) =>
                            {
                                this.snackBar.open(
                                    translationObject['modify.sprint.parameters.error'],
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
        }
    }

    /**
     * Initialisation du tri des utilisateurs (présent ou non dans le sprint)
     *
     * @author Fabien Bellanger
     */
    private initSortUsers(): void
    {
        const users: any[] = this.sprint.users;

        for (const user of users)
        {
            if (user.inTeam)
            {
                this.usersInSprint.push(user);
            }
            else
            {
                this.usersNotInSprint.push(user);
            }
        }
    }

    /**
     * Ajouter un utilisateur au sprint
     *
     * @author Fabien Bellanger
     * @param {integer} index Indice dans le tableau des utilisateurs à ajouter
     */
    public addUser(index: number): void
    {
        if (index >= 0)
        {
            // Suppression du tableau des utilisateurs non présents dans le sprint
            const user: any = this.usersNotInSprint.splice(index, 1);

            // Ajout au tableau des utilisateurs faisant partie du sprint
            this.usersInSprint.push(user[0]);

            // On remet le "placeholder" du select
            this.userIndexToAdd = -1;
        }
    }

    /**
     * Suppression un utilisateur au sprint
     *
     * @author Fabien Bellanger
     * @param {integer} index Indice dans le tableau des utilisateurs à ajouter
     */
    public deleteUser(index: number): void
    {
        // Suppression du tableau des utilisateurs présents dans le sprint
        const user: any = this.usersInSprint.splice(index, 1);

        // Ajout au tableau des utilisateurs ne faisant pas partie du sprint
        this.usersNotInSprint.push(user[0]);
    }
}
