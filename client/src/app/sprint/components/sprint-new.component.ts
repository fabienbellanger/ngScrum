import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ApiSprintService } from '../../api';
import { UserService } from '../../auth';

@Component({
    selector:    'sa-sprint-new',
    templateUrl: './sprint-new.component.html',
})

export class SprintNewComponent implements OnInit
{
    public sprintFormGroup: FormGroup;

	/**
     * Constructeur
     *
     * @author Fabien Bellanger
     * @param {ApiSprintService}    apiSprintService
     * @param {Router}              router
     * @param {UserService}         userService
     */
    constructor(private apiSprintService: ApiSprintService,
                private router: Router,
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
		// Initialisation
		// --------------


		// FormControls
        // ------------
        this.sprintFormGroup = new FormGroup({
            name:      new FormControl('', [
                Validators.required,
                Validators.maxLength(50),
            ]),
            team:      new FormControl('', []),
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

    }
}
