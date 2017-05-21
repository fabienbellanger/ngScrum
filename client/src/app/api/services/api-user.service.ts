import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Headers } from '@angular/http';

import { HttpService, StorageService } from '../../shared';

@Injectable()

export class ApiUserService
{
    /**
     * Constructeur
     *
     * @author Fabien Bellanger
     * @param {HttpService}		httpService
     * @param {StorageService}	storageService
     */
    constructor(private httpService: HttpService,
                private storageService: StorageService)
    {
    }
}
