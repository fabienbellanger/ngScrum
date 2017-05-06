import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
// import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

/**
 * Http service
 *
 * @author Fabien Bellanger
 */
@Injectable()
export class HttpService
{
    /*
     |----------------------------------------------------------------------------
     | Variables
     |----------------------------------------------------------------------------
     */
    public baseUrl: string;

    /**
     * Constructeur
     *
     * @author Fabien Bellanger
     * @param {Http}                    http
     * @param {Router}                  router
     * @param {SlimLoadingBarService}   slimLoadingBarService
     */
    constructor(private http: Http,
                private router: Router)
                //private slimLoadingBarService: SlimLoadingBarService)
    {
        this.baseUrl = environment.apiUrl;
    }

    /**
     * URL encode un objet
     *
     * @author Fabien Bellanger
     * @param  {Object} object
     * @return {String} URL
     */
    public urlEncode(object: Object): string
    {
        return Object.keys(object)
                     .map((key: string) => key + '=' + object[key])
                     .join('&');
    }

    /**
     * Gestion de l'erreur 401 Unauthorized
     *
     * @author Fabien Bellanger
     * @param {any} error   Erreur retournée par la requête
     */
    private manage401Error(error: any): void
    {
        if (error.hasOwnProperty('status') && error.status === 401)
        {
            // Redirection vers /logout
            this.router.navigate(['/logout']);
        }
    }

    /**
     * Méthode GET
     *
     * @author Fabien Bellanger
     * @param {string}      url
     * @param {Object}      options         (default {})
     * @param {boolean}     withCredentials (default true)
     * @param {boolean}     loading         (default true)
     * @param {boolean}     baseUrl         (default true)
     * @return {Promise}
     */
    public get(url: string,
               options: any,
               withCredentials: boolean = true,
               loading: boolean = true,
               baseUrl: boolean = true): any
    {
        // Start loader
        if (loading)
        {
            //this.slimLoadingBarService.start();
        }

        return new Promise((resolve: any, reject: any) =>
        {
            if (typeof url === 'string')
            {
                // Options
                options.withCredentials            = withCredentials;
                let requestOptions: RequestOptions = new RequestOptions(options);

                let get: any = this.http.get((baseUrl ? this.baseUrl : '') + url, requestOptions);

                get.map((res: Response) => res.json())
                   .subscribe(
                       (data: any) =>
                       {
                           if (loading)
                           {
                               //this.slimLoadingBarService.complete();
                           }

                           return resolve(data);
                       },
                       (error: any) =>
                       {
                           if (loading)
                           {
                               //this.slimLoadingBarService.complete();
                           }

                           // Gestion de l'erreur 401
                           this.manage401Error(error);

                           reject(error);
                       }
                   );
            }
            else
            {
                if (loading)
                {
                    //this.slimLoadingBarService.complete();
                }

                reject();
            }
        });
    }

    /**
     * Méthode POST
     *
     * @author Fabien Bellanger
     * @param {string}      url
     * @param {Pbject}      body
     * @param {Object}      options         (default {})
     * @param {boolean}     withCredentials (default true)
     * @param {boolean}     loading         (default true)
     * @return {Promise}
     */
    public post(url: string,
                body: any,
                options: any = {},
                withCredentials: boolean = true,
                loading: boolean = true): any
    {
        // Start loader
        if (loading)
        {
            //this.slimLoadingBarService.start();
        }

        return new Promise((resolve: any, reject: any) =>
        {
            if (typeof url === 'string' && typeof body === 'object')
            {
                // Options
                options.withCredentials            = withCredentials;
                let requestOptions: RequestOptions = new RequestOptions(options);
                let bodyUrlEncoded: string         = this.urlEncode(body);
                let post: any                      = this.http.post(this.baseUrl + url, bodyUrlEncoded, requestOptions);

                post.map((res: Response) => res.json())
                    .subscribe(
                        (data: any) =>
                        {
                            if (loading)
                            {
                                //this.slimLoadingBarService.complete();
                            }

                            return resolve(data);
                        },
                        (error: any) =>
                        {
                            if (loading)
                            {
                                //this.slimLoadingBarService.complete();
                            }

                            // Gestion de l'erreur 401
                            this.manage401Error(error);

                            reject(error);
                        }
                    );
            }
            else
            {
                if (loading)
                {
                    //this.slimLoadingBarService.complete();
                }

                reject();
            }
        });
    }

    /**
     * Méthode PUT
     *
     * @author Fabien Bellanger
     * @param {string}      url
     * @param {Object}      body
     * @param {Object}      options         (default {})
     * @param {boolean}     withCredentials (default true)
     * @param {boolean}     loading         (default true)
     * @return {Promise}
     */
    public put(url: string,
               body: any,
               options: any = {},
               withCredentials: boolean = true,
               loading: boolean = true): any
    {
        // Start loader
        if (loading)
        {
            //this.slimLoadingBarService.start();
        }

        return new Promise((resolve: any, reject: any) =>
        {
            if (typeof url === 'string' && typeof body === 'object')
            {
                // Options
                options.withCredentials            = withCredentials;
                let requestOptions: RequestOptions = new RequestOptions(options);
                let bodyUrlEncoded: string         = this.urlEncode(body);
                let put: any                       = this.http.put(this.baseUrl + url, bodyUrlEncoded, requestOptions);

                put.map((res: Response) => res.json())
                   .subscribe(
                       (data: any) =>
                       {
                           if (loading)
                           {
                               //this.slimLoadingBarService.complete();
                           }

                           return resolve(data);
                       },
                       (error: any) =>
                       {
                           if (loading)
                           {
                               //this.slimLoadingBarService.complete();
                           }

                           // Gestion de l'erreur 401
                           this.manage401Error(error);

                           reject(error);
                       }
                   );
            }
            else
            {
                if (loading)
                {
                    //this.slimLoadingBarService.complete();
                }

                reject();
            }
        });
    }

    /**
     * Méthode PATCH
     *
     * @author Fabien Bellanger
     * @param {string}      url
     * @param {Object}      body
     * @param {Object}      options         (default {})
     * @param {boolean}     withCredentials (default true)
     * @param {boolean}     loading         (default true)
     * @return {Promise}
     */
    public patch(url: string,
                 body: any,
                 options: any = {},
                 withCredentials: boolean = true,
                 loading: boolean = true): any
    {
        // Start loader
        if (loading)
        {
            //this.slimLoadingBarService.start();
        }

        return new Promise((resolve: any, reject: any) =>
        {
            if (typeof url === 'string' && typeof body === 'object')
            {
                // Options
                options.withCredentials            = withCredentials;
                let requestOptions: RequestOptions = new RequestOptions(options);
                let bodyUrlEncoded: string         = this.urlEncode(body);
                let patch: any                     = this.http.patch(this.baseUrl + url, bodyUrlEncoded, requestOptions);

                patch.map((res: Response) => res.json())
                     .subscribe(
                         (data: any) =>
                         {
                             if (loading)
                             {
                                 //this.slimLoadingBarService.complete();
                             }

                             return resolve(data);
                         },
                         (error: any) =>
                         {
                             if (loading)
                             {
                                 //this.slimLoadingBarService.complete();
                             }

                             // Gestion de l'erreur 401
                             this.manage401Error(error);

                             reject(error);
                         }
                     );
            }
            else
            {
                if (loading)
                {
                    //this.slimLoadingBarService.complete();
                }

                reject();
            }
        });
    }

    /**
     * Méthode DELETE
     * @param {string}      url
     * @param {Object}      options         (default {})
     * @param {boolean}     withCredentials (default true)
     * @param {boolean}     loading         (default true)
     */
    public delete(url: string,
                  options: any = {},
                  withCredentials: boolean = true,
                  loading: boolean = true): any
    {
        // Start loader
        if (loading)
        {
            //this.slimLoadingBarService.start();
        }

        return new Promise((resolve: any, reject: any) =>
        {
            if (typeof url === 'string')
            {
                // Options
                options.withCredentials            = withCredentials;
                let requestOptions: RequestOptions = new RequestOptions(options);
                let del: any                       = this.http.delete(this.baseUrl + url, requestOptions);

                del.map((res: Response) => res.json())
                   .subscribe(
                       (data: any) =>
                       {
                           if (loading)
                           {
                               //this.slimLoadingBarService.complete();
                           }

                           return resolve(data);
                       },
                       (error: any) =>
                       {
                           if (loading)
                           {
                               //this.slimLoadingBarService.complete();
                           }

                           // Gestion de l'erreur 401
                           this.manage401Error(error);

                           reject(error);
                       }
                   );
            }
            else
            {
                if (loading)
                {
                    //this.slimLoadingBarService.complete();
                }

                reject();
            }
        });
    }

    /**
     * Méthode HEAD
     *
     * @author Fabien Bellanger
     * @param {string}      url
     * @param {Object}      options         (default {})
     * @param {boolean}     withCredentials (default true)
     * @param {boolean}     loading         (default true)
     * @return {Promise}
     */
    public head(url: string, options: any = {}, withCredentials: boolean = true): any
    {
        return new Promise((resolve: any, reject: any) =>
        {
            if (typeof url === 'string')
            {
                // Options
                options.withCredentials            = withCredentials;
                let requestOptions: RequestOptions = new RequestOptions(options);
                let head: any                      = this.http.head(this.baseUrl + url, requestOptions);

                head.map((res: Response) => res.json())
                    .subscribe(
                        (data: any) =>
                        {
                            return resolve(data);
                        },
                        (error: any) =>
                        {
                            // Gestion de l'erreur 401
                            this.manage401Error(error);

                            reject(error);
                        }
                    );
            }
            else
            {
                reject();
            }
        });
    }
}
