import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ToastyService } from 'ng2-toasty';
import { TranslateService } from '@ngx-translate/core';

import { ApiSprintService } from '../../../api';
import { StorageService } from '../../../shared';
import { SprintService } from '../../services/sprint.service';

import { Task } from '../../../models';

@Component({
    selector:    'sa-sprint-edit-task-info',
    templateUrl: './sprint-edit-task.component.html',
})

export class SprintEditTaskComponent implements OnInit
{
    public sprintId: number;
    public id: number;
    public description: string;
    public remainingDuration: number;
    public applications: any[];
    public applicationsIds: any;
    public notPlanned: boolean;
    public title: string;
    public buttonTitle: string;
    public task: Task;
    public loading: boolean;
    public taskFormGroup: FormGroup;
    public formSubmitted: boolean;

    /**
     * Constructeur
     *
     * @author Fabien Bellanger
     * @param {ApiSprintService}    apiSprintService
     * @param {ActivatedRoute}      route
     * @param {SprintService}       sprintService
     * @param {StorageService}      storageService
     * @param {ToastyService}       toastyService
     * @param {Router}              router
     * @param {TranslateService}    translateService
     */
    constructor(private apiSprintService: ApiSprintService,
                private route: ActivatedRoute,
                private sprintService: SprintService,
                private storageService: StorageService,
                private toastyService: ToastyService,
                private router: Router,
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
        this.loading       = true;
        this.formSubmitted =  false;

        // Récupération de l'ID du sprint et de la tâche
        // ---------------------------------------------
        this.sprintId = +this.route.snapshot.params['sprintId'];
        this.id       = +this.route.snapshot.params['taskId'];
        this.id       = (isNaN(this.id)) ? 0 : this.id;

        // Titre
        // -----
        this.translateService.get([
            'add.task.title',
            'edit.task.title',
            'add',
            'modify',
        ]).subscribe((transltationObject: Object) =>
        {
            this.title = (this.id === 0)
                ? transltationObject['add.task.title']
                : transltationObject['edit.task.title'];

            this.buttonTitle = (this.id === 0)
                ? transltationObject['add']
                : transltationObject['modify'];
        });

        // Initialisation
        // --------------
        this.applications = this.storageService.get('session', 'applications', []);

        // FormControls
        // ------------
        this.taskFormGroup = new FormGroup({
            name:     new FormControl('', [
                Validators.required,
                Validators.maxLength(100),
            ]),
            duration: new FormControl('', [
                Validators.required,
                Validators.min(0.5),
                Validators.max(35),
            ]),
        });

        if (this.id === 0)
        {
            this.description     = '';
            this.notPlanned      = false;
            this.applicationsIds = {};

            this.loading = false;
        }
        else
        {
            this.apiSprintService.getTask(this.sprintId, this.id)
                .then((response: any) =>
                {
                    this.taskFormGroup.get('name').setValue(response.name);
                    this.taskFormGroup.get('duration').setValue(response.initialDuration);
                    this.description = response.description;
                    this.notPlanned  = response.addedAfter;

                    // Construction du tableau des applications
                    // ----------------------------------------
                    const applicationIds = response.applications;
                    this.applicationsIds = {};
                    for (let applicationIndex in this.applications)
                    {
                        if (applicationIds.indexOf(this.applications[applicationIndex].id) !== -1)
                        {
                            this.applicationsIds[applicationIndex] = this.applications[applicationIndex].id;
                        }
                    }

                    this.loading = false;
                })
                .catch(() =>
                {
                    this.loading = false;

                    // Notification
                    // ------------
                    this.translateService.get('get.task.error').subscribe((msg: string) =>
                    {
                        this.toastyService.error(msg);
                    });
                });
        }
    }

    /**
     * Ajout / Modification d'une tâche
     *
     * @author Fabien Bellanger
     */
    public editTask(): void
    {
        // Conversion Object => Array
        // --------------------------
        let applicationsIdsSelected: number[] = Object.keys(this.applicationsIds)
                                                      .map((k: any) => this.applicationsIds[k]);

        // Requête
        // -------
        if (this.id === 0)
        {
            // Création
            // --------
            this.addTask(applicationsIdsSelected);
        }
        else
        {
            // Modification
            // ------------
            this.modifyTask(applicationsIdsSelected);
        }
    }

    /**
     * Ajout d'une tâche
     *
     * @author Fabien Bellanger
     * @param {number[]} applicationsIdsSelected Tableau d'ID des applications sélectionnées
     */
    private addTask(applicationsIdsSelected: number[]): void
    {
        if (!this.formSubmitted)
        {
            // Jeton pour n'avoir qu'une soumission
            // ------------------------------------
            this.formSubmitted = true;

            this.apiSprintService.addTask(this.sprintId, {
                name:            this.taskFormGroup.get('name').value,
                description:     this.description,
                duration:        +this.taskFormGroup.get('duration').value,
                notPlanned:      +this.notPlanned,
                applicationsIds: applicationsIdsSelected,
            })
                .then((task: any) =>
                {
                    // Notification
                    // ------------
                    this.translateService.get('add.task.success').subscribe((msg: string) =>
                    {
                        this.toastyService.success(msg);
                    });

                    // Redirection
                    // -----------
                    this.router.navigate(['/sprints', this.sprintId, 'tasks']);

                    // Jeton pour n'avoir qu'une soumission
                    // ------------------------------------
                    this.formSubmitted = false;
                })
                .catch((error: any) =>
                {
                    // Notification
                    // ------------
                    this.translateService.get('add.task.error').subscribe((msg: string) =>
                    {
                        this.toastyService.error(msg);
                    });

                    // Jeton pour n'avoir qu'une soumission
                    // ------------------------------------
                    this.formSubmitted = false;
                });
        }
    }

    /**
     * Modification d'une tâche
     *
     * @author Fabien Bellanger
     * @param {number[]} applicationsIdsSelected Tableau d'ID des applications sélectionnées
     */
    private modifyTask(applicationsIdsSelected: number[]): void
    {
        if (!this.formSubmitted)
        {
            // Jeton pour n'avoir qu'une soumission
            // ------------------------------------
            this.formSubmitted = true;

            this.apiSprintService.modifyTask(this.sprintId, this.id, {
                name:            this.taskFormGroup.get('name').value,
                description:     this.description,
                duration:        +this.taskFormGroup.get('duration').value,
                notPlanned:      +this.notPlanned,
                applicationsIds: applicationsIdsSelected,
            })
                .then((task: any) =>
                {
                    // Notification
                    // ------------
                    this.translateService.get('modify.task.success').subscribe((msg: string) =>
                    {
                        this.toastyService.success(msg);
                    });

                    // Redirection
                    // -----------
                    this.router.navigate(['/sprints', this.sprintId, 'tasks']);

                    // Jeton pour n'avoir qu'une soumission
                    // ------------------------------------
                    this.formSubmitted = false;
                })
                .catch((error: any) =>
                {
                    // Notification
                    // ------------
                    this.translateService.get('modify.task.error').subscribe((msg: string) =>
                    {
                        this.toastyService.error(msg);
                    });

                    // Jeton pour n'avoir qu'une soumission
                    // ------------------------------------
                    this.formSubmitted = false;
                });
        }
    }

    /**
     * Sélection ou désélection d'une application
     *
     * @author Fabien Bellanger
     * @param {any)     event
     * @param {number}  index
     * @param {number}  applicationId
     */
    private toggleApplication(event: any, index: number, applicationId: number): void
    {
        const isApplicationPresent: boolean = (this.applicationsIds[index] !== undefined);

        if (event.checked && !isApplicationPresent)
        {
            this.applicationsIds[index] = applicationId;
        }
        else if (!event.checked && isApplicationPresent)
        {
            delete this.applicationsIds[index];
        }
    }
}
