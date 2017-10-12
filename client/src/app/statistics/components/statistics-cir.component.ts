import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ApiStatisticsService } from '../../api';
import { DateService, ToolboxService } from '../../shared';

@Component({
    selector:    'sa-statistics-cir',
    templateUrl: './statistics-cir.component.html',
})

export class StatisticsCirComponent implements OnInit
{
    public loading: boolean = true;
    public year: number;
    public data: any[];
    public applicationsHeader: any;
    public applicationsTotal: any;
    public totalDuration: number = 0;

    /**
     * Constructeur
     *
     * @author Fabien Bellanger
     * @param {ApiStatisticsService}    apiStatisticsService
     * @param {DateService}             dateService
     * @param {ToolboxService}          toolboxService
     */
    constructor(private apiStatisticsService: ApiStatisticsService,
                private dateService: DateService,
                private toolboxService: ToolboxService)
    {
    }

    /**
     * Initialisation du composant
     *
     * @author Fabien Bellanger
     */
    public ngOnInit(): void
    {
        this.year = this.dateService.now('YYYY');
        this.data = [];

        // Requète pour récupérer les données
        // ----------------------------------
        this.getData();
    }

    /**
     * Requète pour récupérer les données
     *
     * @author Fabien Bellanger
     */
    private getData(): void
    {
        this.loading = true;

        this.apiStatisticsService.getCIRData(this.year)
            .then((data: any) =>
            {
                // Préparation des données
                // -----------------------
                this.prepareData(data);

                this.loading = false;
            })
            .catch(() =>
            {
                console.error('Error CII/CIR data');

                this.loading = false;
            });
    }

    /**
     * Préparation des données
     *
     * @author Fabien Bellanger
     */
    private prepareData(data: any): void
    {
        const applicationsHeader: any = {};
        const applicationsTotal: any  = {};

        for (const index in data)
        {
            if (data.hasOwnProperty(index))
            {
                for (const applicationId in data[index].applications)
                {
                    if (data[index].applications.hasOwnProperty(applicationId))
                    {
                        if (!applicationsHeader.hasOwnProperty(applicationId))
                        {
                            applicationsHeader[applicationId]      = {};
                            applicationsHeader[applicationId].id   = +applicationId;
                            applicationsHeader[applicationId].name = data[index].applications[applicationId].name;

                            applicationsTotal[applicationId] = +data[index].applications[applicationId].duration;
                        }
                        else
                        {
                            applicationsTotal[applicationId] += +data[index].applications[applicationId].duration;
                        }

                        // Mise à jour du total des heures travaillées
                        // -------------------------------------------
                        this.totalDuration += +data[index].applications[applicationId].duration;
                    }
                }
            }
        }

        // Conversion Object => Array
        // --------------------------
        this.applicationsHeader = this.toolboxService.objectToArray(applicationsHeader);
        this.applicationsTotal  = this.toolboxService.objectToArray(applicationsTotal);

        this.data = data;
    }
}
