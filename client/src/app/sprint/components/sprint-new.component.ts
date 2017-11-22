import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

import { TranslateService } from '@ngx-translate/core';

import { ApiSprintService, ApiTeamService } from '../../api';
import { UserService } from '../../auth';
import { DateService } from '../../shared';

@Component({
    selector:    'sa-sprint-new',
    templateUrl: './sprint-new.component.html',
})

export class SprintNewComponent implements OnInit
{
    public sprintFormGroup: FormGroup;
    public formSubmitted:   boolean;
    public loading:         boolean;
    public teams:           any[] = [];

    /**
     * Constructeur
     *
     * @author Fabien Bellanger
     * @param {ApiSprintService}    apiSprintService
     * @param {ApiTeamService}      apiTeamService
     * @param {Router}              router
     * @param {UserService}         userService
     * @param {DateService}         dateService
     * @param {TranslateService}    translateService
     * @param {MatSnackBar}         snackBar
     */
    constructor(private apiSprintService: ApiSprintService,
                private apiTeamService: ApiTeamService,
                private router: Router,
                public userService: UserService,
                private dateService: DateService,
                private translateService: TranslateService,
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
        this.formSubmitted = false;

        // FormControls
        // ------------
        this.sprintFormGroup = new FormGroup({
            name:        new FormControl('', [
                Validators.required,
                Validators.maxLength(50),
            ]),
            team:        new FormControl('', [
                Validators.required,
            ]),
            startedAt:   new FormControl(new Date(), [
                Validators.required,
            ]),
            deliveredAt: new FormControl('', []),
        });

        // Récupération des équipes
        // ------------------------
        this.loading = true;
        this.apiTeamService.getAllTeams()
            .then((teams: any[]) =>
            {
                this.teams   = teams;
                this.loading = false;
            })
            .catch(() =>
            {
                // Notification
                // ------------
                this.translateService.get(['no.team', 'error'])
                .subscribe((translationObject: Object) =>
                {
                    this.snackBar.open(
                        translationObject['no.team'],
                        translationObject['error'],
                        {
                            duration: 3000,
                        });
                });
                
                this.loading = false;
            });
    }

    /**
     * Nouveau sprint
     *
     * @author Fabien Bellanger
     */
    public newSprint(): void
    {
        if (!this.formSubmitted)
        {
            // Jeton pour n'avoir qu'une soumission
            // ------------------------------------
            this.formSubmitted = true;

            const data: any = {
                name:        this.sprintFormGroup.get('name').value,
                teamId:      this.sprintFormGroup.get('team').value,
                startedAt:   this.dateService.toSqlDate(this.sprintFormGroup.get('startedAt').value),
                deliveredAt: this.dateService.toSqlDate(this.sprintFormGroup.get('deliveredAt').value),
            };

            this.apiSprintService.newSprint(data)
                .then(() =>
                {
                    // Notification
                    // ------------
                    this.translateService.get(['new.sprint.success', 'success'])
                        .subscribe((translationObject: Object) =>
                        {
                            this.snackBar.open(
                                translationObject['new.sprint.success'],
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
                    this.translateService.get(['new.sprint.error', 'error'])
                        .subscribe((translationObject: Object) =>
                        {
                            this.snackBar.open(
                                translationObject['new.sprint.error'],
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
