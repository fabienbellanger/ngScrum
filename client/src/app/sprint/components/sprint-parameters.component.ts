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
    private usersInSprint: any[];
    private usersNotInSprint: any[];
    private loading: boolean       = true;
    private userIndexToAdd: number = -1;

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
        
        this.sprint           = {};
        this.usersInSprint    = [];
        this.usersNotInSprint = [];
        this.apiSprintService.getSprintParameters(sprintId)
            .then((response: any) =>
            {
                this.sprint = response;

                // Initialisation du tri des utilisateurs (présent ou non dans le sprint)
                // ----------------------------------------------------------------------
                this.initSortUsers();

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
            "usersId":   this.usersInSprint.map(element => element.id),  
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
        else if (data.usersId.length === 0)
        {
            this.translateService.get('at.least.one.user.must.be.enter').subscribe((msg: string) =>
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

    /**
     * Initialisation du tri des utilisateurs (présent ou non dans le sprint)
     * 
     * @author Fabien Bellanger
     */
    private initSortUsers(): void
    {
        const users: any[] = this.sprint.users;
        
        for (let user of users)
        {
            if (user.inTeam)
            {
                this.usersInSprint.push(user);
            }
            else
            {
                this.usersNotInSprint.push(user);
            }
        }
    }

    /**
     * Ajouter un utilisateur au sprint
     * 
     * TODO: Supprimer la valeur par défaut
     * 
     * @author Fabien Bellanger
     * @param {integer} index Indice dans le tableau des utilisateurs à ajouter
     */
    private addUser(index: number): void
    {
        if (index >= 0)
        {
            // Suppression du tableau des utilisateurs non présents dans le sprint
            const user: any = this.usersNotInSprint.splice(index, 1);

            // Ajout au tableau des utilisateurs faisant partie du sprint
            this.usersInSprint.push(user[0]);

            // On remet le "placeholder" du select
            this.userIndexToAdd = -1;
        }
    }

    /**
     * Suppression un utilisateur au sprint
     * 
     * @author Fabien Bellanger
     * @param {integer} index Indice dans le tableau des utilisateurs à ajouter
     */
    private deleteUser(index: number): void
    {
        // Suppression du tableau des utilisateurs présents dans le sprint
        const user: any = this.usersInSprint.splice(index, 1);

        // Ajout au tableau des utilisateurs ne faisant pas partie du sprint
        this.usersNotInSprint.push(user[0]);
    }
}
