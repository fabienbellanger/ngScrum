import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

import { TranslateService } from '@ngx-translate/core';

import { ApiSprintService, ApiTaskService } from '../../../api';
import { SprintTasksManagementService } from '../../services/sprint-tasks-management.service';

@Component({
    selector:    'sa-sprint-tasks-management-edit',
    templateUrl: './sprint-tasks-management-edit.component.html',
})

export class SprintTasksManagementEditComponent implements OnInit
{
    public loading: boolean;
    public sprintId: number;
    public userId: number;
    public taskId: number;
    public sprint: any;
    public task: any;
    public tasks: any[];
    public taskUser: any;
    public user: any;
    public taskFormGroup: FormGroup;
    public isEdit: boolean;

    /**
     * Constructeur
     *
     * @author Fabien Bellanger
     * @param {ApiSprintService}                apiSprintService
     * @param {ActivatedRoute}                  route
     * @param {Router}                          router
     * @param {MatSnackBar}                     snackBar
     * @param {TranslateService}                translateService
     * @param {SprintTasksManagementService}    sprintTasksManagementService
     * @param {ApiTaskService}                  apiTaskService
     */
    constructor(private apiSprintService: ApiSprintService,
                private route: ActivatedRoute,
                private router: Router,
                private snackBar: MatSnackBar,
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
        this.tasks    = [];
        this.taskUser = null;
        this.user     = null;
        this.isEdit   = !isNaN(this.taskId);
        this.loading  = true;

        // FormControls
        // ------------
        this.taskFormGroup = new FormGroup({
            workedDuration:    new FormControl('', [
                Validators.required,
            ]),
            remainingDuration: new FormControl('', [
                Validators.required,
            ]),
            taskId:            new FormControl('', []),
        });

        // Initialisation
        // --------------
        if (this.sprintTasksManagementService.sprint !== undefined)
        {
            this.init();
        }
        else
        {
            // TODO: Rediriger vers tasks-management-list
            this.sprintTasksManagementService.init(this.sprintId)
                .then(() =>
                {
                    this.init();
                })
                .catch((error: any) =>
                {
                    // Erreur : Données non valides
                    // ----------------------------
                    this.dataError();
    
                    this.loading = false;
                });
        }
    }

    /**
     * Initialisation du sprint
     *
     * @author Fabien Bellanger
     */
    private init(): void
    {
        this.sprint = this.sprintTasksManagementService.sprint;
        
        // Recherche de la tâche
        // ---------------------
        if (this.sprint.tasks.hasOwnProperty(this.taskId))
        {
            this.task = this.sprint.tasks[this.taskId];
        }

        // Récupération de l'utilisateur
        // -----------------------------
        for (const user of this.sprint.users)
        {
            if (user.id === this.userId)
            {
                this.user = user;

                break;
            }
        }

        // Récupération de la TaskUser
        // ---------------------------
        if (this.isEdit)
        {
            for (const taskUser of this.sprint.tasksUsers)
            {
                if (taskUser.taskId === this.taskId && taskUser.userId === this.userId &&
                    taskUser.date === this.sprintTasksManagementService.date)
                {
                    this.taskUser = taskUser;

                    break;
                }
            }
        }

        // Tableau des tâches si création
        // ------------------------------
        if (!this.isEdit)
        {
            let label: string;
            let taskUserDone: boolean;
            let taskUserIndex: number;
            const taskUserLength: number = this.sprint.tasksUsers.length;

            for (const taskId in this.sprint.tasks)
            {
                if (this.sprint.tasks.hasOwnProperty(taskId))
                {
                    // TODO: Doit-on proposer une tâche terminée ?

                    // On n'ajoute pas les tâches déjà faites par l'utilisateur
                    // --------------------------------------------------------
                    taskUserDone  = false;
                    taskUserIndex = 0;
                    while (!(taskUserIndex === taskUserLength || taskUserDone))
                    {
                        if (this.sprint.tasksUsers[taskUserIndex].userId === this.userId &&
                            this.sprint.tasksUsers[taskUserIndex].taskId ===  +taskId)
                        {
                            taskUserDone = true;
                        }

                        taskUserIndex++;
                    }

                    if (!taskUserDone)
                    {
                        label = this.sprint.tasks[taskId].name;
                        label += (this.sprint.tasks[taskId].remainingDuration !== 0)
                            ? ' (' + this.sprint.tasks[taskId].remainingDuration + ' h)'
                            : ' (Terminée)';

                        this.tasks.push({
                            'id':    this.sprint.tasks[taskId].id,
                            'label': label,
                        });
                    }
                }
            }
        }

        if (this.user === null)
        {
            // Erreur : Données non valides
            // ----------------------------
            this.dataError();
        }
        else
        {
            if (this.taskUser !== null && this.task !== null)
            {
                // Mise à jour de la durée restante sur la tâche
                // ---------------------------------------------
                this.task.remainingDuration += this.taskUser.duration;

                // Initialisation du formulaire
                // ----------------------------
                this.taskFormGroup.get('remainingDuration').setValue(this.task.remainingDuration - this.taskUser.duration);
                this.taskFormGroup.get('workedDuration').setValue(this.taskUser.workedDuration);
            }
        }

        this.loading = false;
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
        // -----------
        this.router.navigate(['/sprints', this.sprintId, 'tasks-management']);
    }

    /**
     * Sauvegarde de la tâche
     *
     * @author Fabien Bellanger
     */
    public saveTask(): void
    {
        const taskId: number = (this.isEdit) ? this.taskId : +this.taskFormGroup.get('taskId').value;

        const task: any = (!this.isEdit && this.sprint.tasks.hasOwnProperty(taskId))
            ? this.sprint.tasks[taskId]
            : this.task;

        const data: any = {
            'userId':            +this.userId,
            'workedDuration':    +this.taskFormGroup.get('workedDuration').value,
            'remainingDuration': +this.taskFormGroup.get('remainingDuration').value,
            'date':              this.sprintTasksManagementService.date,
        };

        data.duration = (this.isEdit)
            ? +task.remainingDuration - +this.taskFormGroup.get('remainingDuration').value
            : +task.initialDuration - +this.taskFormGroup.get('remainingDuration').value;

        this.apiTaskService.editTaskUser(this.sprintId, taskId, data, this.isEdit)
            .then(() =>
            {
                // Notification
                // ------------
                this.translateService.get(['add.taskuser.success', 'success'])
                    .subscribe((translationObject: Object) =>
                    {
                        this.snackBar.open(
                            translationObject['add.taskuser.success'],
                            translationObject['success'],
                            {
                                duration: 3000,
                            });
                    });

                // Redirection
                // -----------
                this.router.navigate(['/sprints', this.sprintId, 'tasks-management']);
            })
            .catch(() =>
            {
                // Notification
                // ------------
                this.translateService.get(['add.taskuser.error', 'error'])
                    .subscribe((translationObject: Object) =>
                    {
                        this.snackBar.open(
                            translationObject['add.taskuser.error'],
                            translationObject['error'],
                            {
                                duration: 3000,
                            });
                    });
            });
    }
}
