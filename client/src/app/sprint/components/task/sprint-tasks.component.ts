import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ToastyService } from 'ng2-toasty';
import { TranslateService } from '@ngx-translate/core';

import { ApiSprintService } from '../../../api';
import { SprintService } from '../../services/sprint.service';
import { SprintChartsService } from '../../services/sprint-charts.service';

@Component({
    selector: 'sa-sprint-tasks-info',
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
        // Récupération du sprint
        // ----------------------
        this.sprintId = +this.route.snapshot.params['sprintId'];

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
     * Recherche
     * 
     * @author Fabien Bellanger
     * @param {string} searchValue 
     */
    public search(searchValue: string): void
    {
        console.log(this.sprintService.sprint.tasks);
    }

    /**
     * Suppression d'une tâche
     * 
     * @author Fabien Bellanger
     * @param {number} taskId 
     */
    public deleteTask(taskId: number): void
    {
        this.translateService.get('delete.task.confirm').subscribe((deleteTaskConfirm: string) =>
		{
			if (window.confirm(deleteTaskConfirm))
            {
                this.apiSprintService.deleteTask(this.sprintId, taskId)
                    .then(() =>
                    {
                        // Notification
                        // ------------
                        this.translateService.get('delete.task.success').subscribe((msg: string) =>
		                {
                            this.toastyService.success(msg);
                        });

                        // TODO: Refreh des données
                        // ------------------------
                    })
                    .catch(() =>
                    {
                        // Notification
                        // ------------
                        this.translateService.get('delete.task.error').subscribe((msg: string) =>
		                {
                            this.toastyService.error(msg);
                        });
                    });
            }
		});
        
    }
}
