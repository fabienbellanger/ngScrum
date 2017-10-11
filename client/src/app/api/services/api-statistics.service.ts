import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';

import { HttpService } from '../../shared';

@Injectable()

export class ApiStatisticsService
{
    /**
     * Constructeur
     *
     * @author Fabien Bellanger
     * @param {HttpService}       httpService
     */
    constructor(private httpService: HttpService)
    {
    }

    /**
     * Récupération des données pour afficher les statistiques du CIR
     *
     * @author Fabien Bellanger
     * @param {number} year Année
     * @return {Promise}
     */
    public getCIRData(year: number): any
    {
        return new Promise((resolve: any, reject: any) =>
        {
            // 1. Récupération du token
            // ------------------------
            const token: string = this.storageService.get('session', 'token', null);

            if (token != null)
            {
                // 2. Requête
                // ----------
                const headers: any = new Headers();
                headers.append('Authorization', 'Bearer ' + token);
                headers.append('Content-Type', 'application/json');
                
                this.httpService.get('/statistics/cir/' + year, {headers: headers}, true, true)
                    .then((data: any) =>
                    {
                        resolve(data);
                    })
                    .catch(() =>
                    {
                        reject();
                    });
            }
            else
            {
                reject();
            }
        });
    }
}
