import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Headers } from '@angular/http';

import { HttpService } from '../../shared';

@Injectable()

export class ApiAuthService
{
    /**
     * Constructeur
     *
     * @author Fabien Bellanger
     * @param {HttpService}		httpService
     */
    constructor(private httpService: HttpService)
    {
    }

	/**
	 * Login
	 * 
	 * @author Fabien Bellanger
     * @param {String}  email
     * @param {String}  password
	 * @return {Promise}
	 */
	public login(email: string, password: string): any
	{
		return new Promise((resolve: any, reject: any) =>
        {
            let headers: any = new Headers();
            headers.append('Content-Type', 'application/x-www-form-urlencoded');

			this.httpService.post(
				'/login',
				{
					email:    email,
					password: password,
				},
				{headers: headers},
				false,
				true)
				.then((data: any) =>
				{
					resolve(data);
				})
				.catch((error: any) =>
				{
					reject(error);
				});
        });
	}
}
