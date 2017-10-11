import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { ApiStatisticsService } from '../../api';
import { StorageService } from '../../shared';

@Injectable()

export class StatisticsService
{
    /**
     * Constructeur
     *
     * @author Fabien Bellanger
     * @param {ApiStatisticsService}  	apiStatisticsService
     * @param {StorageService}      	storageService
     * @param {Router}              	router
     */
    constructor(private apiStatisticsService: ApiStatisticsService,
                private storageService: StorageService,
                private router: Router)
    {
    }
}
