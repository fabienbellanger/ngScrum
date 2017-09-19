import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ToastyService } from 'ng2-toasty';
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
     * @param {ToastyService}       toastyService
     * @param {TranslateService}    translateService
     */
    constructor(private apiSprintService: ApiSprintService,
                private router: Router,
                private userService: UserService,
                private dateService: DateService,
                private toastyService: ToastyService,
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
                    this.translateService.get('new.sprint.success').subscribe((msg: string) =>
                    {
                        this.toastyService.success(msg);
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
                    this.translateService.get('new.sprint.error').subscribe((msg: string) =>
                    {
                        this.toastyService.error(msg);
                    });

                    // Jeton pour n'avoir qu'une soumission
                    // ------------------------------------
                    this.formSubmitted = false;
                });
        }
    }
}
