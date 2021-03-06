import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ApiSprintService } from '../../api';
import { SprintService } from '../services/sprint.service';
import { SprintChartsService } from '../services/sprint-charts.service';

@Component({
    selector:    'sa-sprint-statistics',
    templateUrl: './sprint-statistics.component.html',
})

export class SprintStatisticsComponent implements OnInit
{
    public pieChartTotalRemainingHours: any;
    public pieChartTaskTypes: any;
    public lineChartUsesCoefficient: any;

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
                public sprintService: SprintService,
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
                this.pieChartTaskTypes           = this.sprintChartsService.getPieChartTaskTypes();
                this.lineChartUsesCoefficient    = this.sprintChartsService.getLineChartUsesCoefficient();
            })
            .catch(() =>
            {
                console.error('Error sprint info');

                // Graphiques
                // ----------
                this.pieChartTotalRemainingHours = {};
                this.pieChartTaskTypes           = {};
                this.lineChartUsesCoefficient    = {};
            });
    }
}
