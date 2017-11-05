import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';

import { HttpService, StorageService } from '../../shared';

@Injectable()

export class ApiTeamService
{
    /**
     * Constructeur
     *
     * @author Fabien Bellanger
     * @param {HttpService}       httpService
     * @param {StorageService}    storageService
     */
    constructor(private httpService: HttpService,
                private storageService: StorageService)
    {
    }
}
