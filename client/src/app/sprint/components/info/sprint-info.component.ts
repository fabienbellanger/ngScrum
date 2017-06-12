import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ApiSprintService } from '../../../api';
import { SprintService } from '../../services/sprint.service';
import { SprintChartsService } from '../../services/sprint-charts.service';

@Component({
    selector:    'sa-sprint-info',
    templateUrl: './sprint-info.component.html',
})

export class SprintInfoComponent implements OnInit
{
    public pieChartTotalRemainingHours: any;

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
        this.sprintService.init(null);
    }

    /**
     * Initialisation du composant
     *
     * @author Fabien Bellanger
     */
    public ngOnInit(): void
    {
        const sprintId: number = +this.route.snapshot.params['sprintId'];

        this.apiSprintService.getSprintInformation(sprintId)
            .then((sprint: any) =>
            {
                this.sprintService.init(sprint);

                // Graphiques
                // ----------
                this.pieChartTotalRemainingHours = this.sprintChartsService.getPieChartTotalRemainingHours();
            })
            .catch(() =>
            {
                console.error('Error sprint info');

                // Graphiques
                // ----------
                this.pieChartTotalRemainingHours = {};
            });
    }
}
