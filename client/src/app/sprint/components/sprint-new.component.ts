import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

import { TranslateService } from '@ngx-translate/core';

import { ApiSprintService } from '../../api';
import { UserService } from '../../auth';
import { DateService } from '../../shared';

@Component({
    selector:    'sa-sprint-new',
    templateUrl: './sprint-new.component.html',
})

export class SprintNewComponent implements OnInit
{
    public sprintFormGroup: FormGroup;
    private formSubmitted: boolean;

	/**
     * Constructeur
     *
     * @author Fabien Bellanger
     * @param {ApiSprintService}    apiSprintService
     * @param {Router}              router
     * @param {UserService}         userService
     * @param {DateService}         dateService
     * @param {TranslateService}    translateService
     * @param {MatSnackBar}         snackBar
     */
    constructor(private apiSprintService: ApiSprintService,
                private router: Router,
                private userService: UserService,
                private dateService: DateService,
                private translateService: TranslateService,
                private snackBar: MatSnackBar)
    {
        console.log(this.dateService.getHolidayDates(2017));
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
            name:      new FormControl('', [
                Validators.required,
                Validators.maxLength(50),
            ]),
            team:      new FormControl('', [
                Validators.required,
            ]),
            startedAt: new FormControl(new Date(), [
                Validators.required,
            ]),
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
                name:      this.sprintFormGroup.get('name').value,
                teamId:    this.sprintFormGroup.get('team').value,
                startedAt: this.dateService.toSqlDate(this.sprintFormGroup.get('startedAt').value),
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
