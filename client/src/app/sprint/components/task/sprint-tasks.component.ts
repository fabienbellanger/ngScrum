import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatSnackBar } from '@angular/material';

import { TranslateService } from '@ngx-translate/core';

import { SprintTaskDeleteDialogComponent } from '../dialogs/sprint-task-delete-dialog.component';

import { ApiSprintService } from '../../../api';
import { SprintService } from '../../services/sprint.service';
import { SprintChartsService } from '../../services/sprint-charts.service';
import { StorageService } from '../../../shared';

@Component({
    selector:    'sa-sprint-tasks-info',
    templateUrl: './sprint-tasks.component.html',
})

export class SprintTasksComponent implements OnInit
{
    public sprintId: number;
    public taskTypes: any[];

    /**
     * Constructeur
     *
     * @author Fabien Bellanger
     * @param {ApiSprintService}    apiSprintService
     * @param {ActivatedRoute}      route
     * @param {SprintService}       sprintService
     * @param {SprintChartsService} sprintChartsService
     * @param {MatSnackBar}         snackBar
     * @param {MatDialog}           dialog
     * @param {Router}              router
     * @param {TranslateService}    translateService
     * @param {StorageService}      storageService
     */
    constructor(private apiSprintService: ApiSprintService,
                private route: ActivatedRoute,
                public sprintService: SprintService,
                private sprintChartsService: SprintChartsService,
                private snackBar: MatSnackBar,
                private dialog: MatDialog,
                private router: Router,
                private translateService: TranslateService,
                private storageService: StorageService)
    {
    }

    /**
     * Initialisation du composant
     *
     * @author Fabien Bellanger
     */
    public ngOnInit(): void
    {
        // Récupération du sprint
        // ----------------------
        this.sprintId = +this.route.snapshot.params['sprintId'];

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
        // Remise à zéro du sprint
        // -----------------------
        this.sprintService.sprint = null;

        // Liste des types de tâche
        // ------------------------
        this.taskTypes = this.storageService.get('session', 'taskTypes', {});

        // Initialisation du sprint
        // ------------------------
        this.apiSprintService.getSprintInformation(this.sprintId)
            .then((sprint: any) =>
            {
                this.sprintService.init(sprint);
            })
            .catch(() =>
            {
                console.error('Error sprint tasks list');
            });
    }

    /**
     * Suppression d'une tâche
     *
     * @author Fabien Bellanger
     * @param {number} taskId ID de la tâche
     */
    public deleteTask(taskId: number): void
    {
        const dialog = this.dialog.open(SprintTaskDeleteDialogComponent, {
            data: {
                confirm: true,
            },
            disableClose: false,
        });

        dialog.afterClosed().subscribe((result: any) =>
        {
            this.translateService.get([
                'delete.task.confirm.title',
                'delete.task.confirm.body',
                'delete.task.success',
                'delete.task.error',
                'ok',
                'cancel',
            ]).subscribe((translationObject: Object) =>
            {
                if (result === true)
                {
                    this.apiSprintService.deleteTask(this.sprintId, taskId)
                        .then(() =>
                        {
                            // Notification
                            // ------------
                            this.snackBar.open(
                                translationObject['delete.task.success'],
                                translationObject['success'],
                                {
                                    duration: 3000,
                                });

                            // Rechargement de la vue
                            // ----------------------
                            this.init();
                        })
                        .catch(() =>
                        {
                            // Notification
                            // ------------
                            this.snackBar.open(
                                translationObject['delete.task.error'],
                                translationObject['error'],
                                {
                                    duration: 3000,
                                });
                        });
                }
            });
        });
    }

    /**
     * Edition d'une tâche
     *
     * @author Fabien Bellanger
     * @param {number} taskId ID de la tâche
     */
    public editTask(taskId: number): void
    {
        this.router.navigate(['/sprints', this.sprintId, 'tasks', 'edit', taskId]);
    }
    
    /**
     * Liste des tâches management
     *
     * @author Fabien Bellanger
     */
    public tasksManagementList(): void
    {
        this.router.navigate(['/sprints', this.sprintId, 'tasks-management-list']);
    }
}
