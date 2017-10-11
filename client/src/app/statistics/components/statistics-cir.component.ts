import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ApiStatisticsService } from '../../api';

@Component({
    selector:    'sa-statistics-cir',
    templateUrl: './statistics-cir.component.html',
})

export class StatisticsCirComponent implements OnInit
{
    /**
     * Constructeur
     *
     * @author Fabien Bellanger
     * @param {ApiStatisticsService}    apiStatisticsService
     */
    constructor(private apiStatisticsService: ApiStatisticsService)
    {
    }

    /**
     * Initialisation du composant
     *
     * @author Fabien Bellanger
     */
    public ngOnInit(): void
    {
    }
}
