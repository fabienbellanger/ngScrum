import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ApiSprintService } from '../../../api';
import { SprintService } from '../../services/sprint.service';
import { SprintChartsService } from '../../services/sprint-charts.service';

@Component({
    selector:    'sa-sprint-tasks-info',
    templateUrl: './sprint-tasks.component.html',
})

export class SprintTasksComponent implements OnInit
{
    /**
     * Constructeur
     *
     * @author Fabien Bellanger
     * @param {ApiSprintService}    apiSprintService
     * @param {ActivatedRoute}      route
     * @param {SprintService}       sprintService
     * @param {SprintChartsService} sprintChartsService
     */
    constructor(private apiSprintService: ApiSprintService,
                private route: ActivatedRoute,
                private sprintService: SprintService,
                private sprintChartsService: SprintChartsService)
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
        const sprintId: number = +this.route.snapshot.params['sprintId'];

        this.apiSprintService.getSprintInformation(sprintId)
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
}
