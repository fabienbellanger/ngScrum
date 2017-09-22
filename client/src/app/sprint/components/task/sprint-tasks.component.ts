import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Modal } from 'ngx-modialog/plugins/bootstrap';
import { ToastyService } from 'ng2-toasty';
import { TranslateService } from '@ngx-translate/core';

import { ApiSprintService } from '../../../api';
import { SprintService } from '../../services/sprint.service';
import { SprintChartsService } from '../../services/sprint-charts.service';

@Component({
    selector:    'sa-sprint-tasks-info',
    templateUrl: './sprint-tasks.component.html',
})

export class SprintTasksComponent implements OnInit
{
    public sprintId: number;

    /**
     * Constructeur
     *
     * @author Fabien Bellanger
     * @param {ApiSprintService}    apiSprintService
     * @param {ActivatedRoute}      route
     * @param {SprintService}       sprintService
     * @param {SprintChartsService} sprintChartsService
     * @param {ToastyService}       toastyService
     * @param {Router}              router
     * @param {TranslateService}    translateService
     */
    constructor(private apiSprintService: ApiSprintService,
                private route: ActivatedRoute,
                private sprintService: SprintService,
                private sprintChartsService: SprintChartsService,
                private toastyService: ToastyService,
                private router: Router,
                private translateService: TranslateService,
                private modal: Modal)
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
    private deleteTask(taskId: number): void
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
            this.modal.confirm()
                .size('sm')
                .isBlocking(true)
                .showClose(true)
                .keyboard(27)
                .okBtn(translationObject['ok'])
                .cancelBtn(translationObject['cancel'])
                .title(translationObject['delete.task.confirm.title'])
                .body(translationObject['delete.task.confirm.body'])
                .open()
                .catch((error: any) => console.error('ERROR: ' + error))
                .then((dialog: any) =>
                {
                    return dialog.result;
                })
                .then((result: any) =>
                {
                    this.apiSprintService.deleteTask(this.sprintId, taskId)
                        .then(() =>
                        {
                            // Notification
                            // ------------
                            this.toastyService.success(translationObject['delete.task.success']);

                            // Rechargement de la vue
                            // ----------------------
                            this.init();
                        })
                        .catch(() =>
                        {
                            // Notification
                            // ------------
                            this.toastyService.error(translationObject['delete.task.error']);
                        });
                })
                .catch((cancel: any) => {});
        });
    }

    /**
     * Edition d'une tâche
     *
     * @author Fabien Bellanger
     * @param {number} taskId ID de la tâche
     */
    private editTask(taskId: number): void
    {
        this.router.navigate(['/sprints', this.sprintId, 'tasks', 'edit', taskId]);
    }
}
