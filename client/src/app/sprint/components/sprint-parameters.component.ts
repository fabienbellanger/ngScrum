import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ToastyService } from 'ng2-toasty';
import { TranslateService } from '@ngx-translate/core';

import { ApiSprintService } from '../../api';
import { UserService } from '../../auth';

@Component({
    selector:    'sa-sprint-parameters',
    templateUrl: './sprint-parameters.component.html',
})

export class SprintParametersComponent implements OnInit
{
    private sprint: any;
    private loading: boolean = true;

    /**
     * Constructeur
     *
     * @author Fabien Bellanger
     * @param {ApiSprintService}    apiSprintService
     * @param {ActivatedRoute}      route
     * @param {Router}              router
     * @param {UserService}         userService
     * @param {ToastyService}       toastyService
     * @param {TranslateService}    translateService
     */
    constructor(private apiSprintService: ApiSprintService,
                private route: ActivatedRoute,
                private router: Router,
                private userService: UserService,
                private toastyService: ToastyService,
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
        const sprintId: number = +this.route.snapshot.params['sprintId'];
        
        this.sprint = {};
        this.apiSprintService.getSprintParameters(sprintId)
            .then((response: any) =>
            {
                this.sprint = response;

                this.loading = false;
            })
            .catch(() =>
            {
                console.log('Error: Get Sprint Parameters');                

                this.loading = false;
            });
    }

    /**
     * Enregistrement des paramètres
     * 
     * @author Fabien Bellanger
     */
    private saveParameters(): void
    {
        const data: any = {
            "name":      this.sprint.name,
            "startedAt": this.sprint.startedAt,
        };

        if (data.name === '' || data.name === null || data.name === undefined)
        {
            this.translateService.get('name.must.be.enter').subscribe((msg: string) =>
            {
                this.toastyService.error(msg);
            });
        }
        else if (data.name === '' || data.name === null || data.name === undefined)
        {
            this.translateService.get('started.date.must.be.enter').subscribe((msg: string) =>
            {
                this.toastyService.error(msg);
            });
        }
        else
        {
            this.apiSprintService.modifySprintParameters(this.sprint.id, data)
                .then((response: any) =>
                {
                    // Notification
                    // ------------
                    this.translateService.get('modify.sprint.parameters.success').subscribe((msg: string) =>
                    {
                        this.toastyService.success(msg);
                    });

                    // Redirection
                    // -----------
                    this.router.navigate(['/sprints']);
                })
                .catch(() =>
                {
                    // Notification
                    // ------------
                    this.translateService.get('modify.sprint.parameters.error').subscribe((msg: string) =>
                    {
                        this.toastyService.error(msg);
                    });
                });
        }
    }
}
