import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ToastyService } from 'ng2-toasty';
import { TranslateService } from '@ngx-translate/core';

import { ApiSprintService, ApiTaskService } from '../../../api';
import { SprintTasksManagementService } from '../../services/sprint-tasks-management.service';

@Component({
    selector:    'sa-sprint-tasks-management-edit',
    templateUrl: './sprint-tasks-management-edit.component.html',
})

export class SprintTasksManagementEditComponent implements OnInit
{
    private loading: boolean = true;
    private sprintId: number;
    private userId: number;
    private taskId: number;
    private sprint: any;
    private task: any;
    private taskUser: any;
    private user: any;
    private taskFormGroup: FormGroup;

    /**
     * Constructeur
     *
     * @author Fabien Bellanger
     * @param {ApiSprintService}                apiSprintService
     * @param {ActivatedRoute}                  route
     * @param {Router}                          router
     * @param {ToastyService}                   toastyService
     * @param {TranslateService}                translateService
     * @param {SprintTasksManagementService}    sprintTasksManagementService
     * @param {ApiTaskService}                  apiTaskService
     */
    constructor(private apiSprintService: ApiSprintService,
                private route: ActivatedRoute,
                private router: Router,
                private toastyService: ToastyService,
                private translateService: TranslateService,
                private apiTaskService: ApiTaskService,
                private sprintTasksManagementService: SprintTasksManagementService)
    {
    }

    /**
     * Initialisation du composant
     *
     * @author Fabien Bellanger
     */
    public ngOnInit(): void
    {
        // Initialisation des variables
        // ----------------------------
        this.sprintId = +this.route.snapshot.params['sprintId'];
        this.userId   = +this.route.snapshot.params['userId'];
        this.taskId   = +this.route.snapshot.params['taskId'];
        this.sprint   = null;
        this.task     = null;
        this.taskUser = null;
        this.user     = null;

        // FormControls
        // ------------
        this.taskFormGroup = new FormGroup({
            workedHours:    new FormControl('', [
                Validators.required,
            ]),
            remainingHours: new FormControl('', [
                Validators.required,
            ]),
        });

        // Initialisation
        // --------------
        this.init();
    }

    /**
     * Initialisation du sprint
     *
     * @author Fabien Bellanger
     */
    private init(): void
    {
        // Initialisation du sprint
        // ------------------------
        this.sprintTasksManagementService.init(this.sprintId)
            .then(() =>
            {
                this.sprint = this.sprintTasksManagementService.sprint;

                // Recherche de la tâche
                // ---------------------
                if (this.sprint.tasks.hasOwnProperty(this.taskId))
                {
                    this.task = this.sprint.tasks[this.taskId];
                }

                // Récupération de la TaskUser
                // ---------------------------
                for (let taskUser of this.sprint.tasksUsers)
                {
                    if (taskUser.taskId === this.taskId && taskUser.userId === this.userId)
                    {
                        this.taskUser = taskUser;

                        break;
                    }
                }

                // Récupération de l'utilisateur
                // -----------------------------
                for (let user of this.sprint.users)
                {
                    if (user.id === this.userId)
                    {
                        this.user = user;

                        break;
                    }
                }

                if (this.task === null || this.taskUser === null || this.user === null)
                {
                    // Erreur : Données non valides
                    // ----------------------------
                    this.dataError();
                }
                else
                {
                    // TODO
                    console.log(this.task, this.taskUser, this.user);
                }

                this.loading = false;
            })
            .catch((error: any) =>
            {
                // Erreur : Données non valides
                // ----------------------------
                this.dataError();

                this.loading = false;
            })
    }

    /**
     * Gestion des erreurs concernant les données
     *
     * @author Fabien Bellanger
     */
    private dataError(): void
    {
        // Notification
        // ------------
        this.translateService.get('get.data.error').subscribe((msg: string) =>
        {
            this.toastyService.error(msg);
        });

        // Redirection
        // -----------
        this.router.navigate(['/sprints', this.sprintId, 'tasks-management']);
    }

    /**
     * Sauvegarde de la tâche
     *
     * @author Fabien Bellanger
     */
    private saveTask(): void
    {
        const data: any = {
            'userId':            +this.userId,
            'workedDuration':    +this.taskFormGroup.get('workedHours').value,
            'remainingDuration': +this.taskFormGroup.get('remainingHours').value,
            'duration':          +this.task.remainingDuration - +this.taskFormGroup.get('remainingHours').value,
            'date':              this.sprintTasksManagementService.date,
        };

        this.apiTaskService.editTaskUser(this.sprintId, this.taskId, data)
            .then(() =>
            {
                // Notification
                // ------------
                this.translateService.get('add.taskuser.success').subscribe((msg: string) =>
                {
                    this.toastyService.success(msg);
                });

                // Redirection
                // -----------
                this.router.navigate(['/sprints', this.sprintId, 'tasks-management']);
            })
            .catch(() =>
            {
                // Notification
                // ------------
                this.translateService.get('add.taskuser.success').subscribe((msg: string) =>
                {
                    this.toastyService.error(msg);
                });
            });
    }
}
