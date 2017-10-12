import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { TranslateService } from '@ngx-translate/core';

import { ApiStatisticsService } from '../../api';
import { DateService, ToolboxService, CsvService } from '../../shared';

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
     * @param {CsvService}              csvService
     * @param {TranslateService}        translateService
     */
    constructor(private apiStatisticsService: ApiStatisticsService,
                private dateService: DateService,
                private toolboxService: ToolboxService,
                private csvService: CsvService,
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

    /**
     * Préparation des données pour l'export CSV
     * 
     * @author Fabien Bellanger
     * @returns {any}
     */
    private prepareDataForCsvExport(): any
    {
        const headers: string[] = [];
        const data: any[]       = [];

        this.translateService.get(['users', 'other']).subscribe((translationObject: Object) =>
        {
            // Entêtes
            // -------
            headers.push(translationObject['users']);
            for (const application of this.applicationsHeader)
            {
                if (application.id === 0)
                {
                    headers.push(translationObject['other']);
                }
                else
                {
                    headers.push(application.name);
                }
            }

            // Données
            // -------
            let userInfo: any[];
            for (const line of this.data)
            {
                // Première colonne : Nom de l'utilisateur
                userInfo = [];
                userInfo.push(line.firstname + ' ' + line.lastname);

                let durationString: string;
                for (const application of this.applicationsHeader)
                {
                    if (!line.applications.hasOwnProperty(application.id))
                    {
                        userInfo.push(0);
                    }
                    else
                    {
                        // TODO: Généraliser pour gérer plusieurs locales
                        durationString = line.applications[application.id].duration + '';

                        userInfo.push(durationString.replace('.', ','));
                    }
                }

                data.push(userInfo);
            }
        });

        return {
            headers: headers,
            data:    data,
        };
    }

    /**
     * Export CSV
     * 
     * @author Fabien Bellanger
     */
    public exportToCSV(): void
    {
        this.translateService.get('cii.cir.csv.filename').subscribe((message: string) =>
        {
            // Préparation des données pour l'export
            // -------------------------------------
            const basename: string = `${message}_${this.year}`; 
            let headers:    string[];
            let data:       any[];

            const preparedData: any = this.prepareDataForCsvExport();
            headers = preparedData.headers;
            data    = preparedData.data;

            // Export
            // ------
            this.csvService.exportToCSV(headers, data, basename);
        });
    }
}
