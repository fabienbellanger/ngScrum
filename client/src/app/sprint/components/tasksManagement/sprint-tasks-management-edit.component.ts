import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ToastyService } from 'ng2-toasty';
import { TranslateService } from '@ngx-translate/core';

import { ApiSprintService } from '../../../api';
import { SprintTasksManagementService } from '../../services/sprint-tasks-management.service';

@Component({
    selector:    'sa-sprint-tasks-management-edit',
    templateUrl: './sprint-tasks-management-edit.component.html',
})

export class SprintTasksManagementEditComponent implements OnInit
{
    private loading: boolean = true;
    private sprintId: number;
    private userId: number;
    private taskId: number;
    private sprint: any;
    private task: any;
    private taskUser: any;

    /**
     * Constructeur
     *
     * @author Fabien Bellanger
     * @param {ApiSprintService}                apiSprintService
     * @param {ActivatedRoute}                  route
     * @param {Router}                          router
     * @param {ToastyService}                   toastyService
     * @param {TranslateService}                translateService
     * @param {SprintTasksManagementService}    sprintTasksManagementService
     */
    constructor(private apiSprintService: ApiSprintService,
                private route: ActivatedRoute,
                private router: Router,
                private toastyService: ToastyService,
                private translateService: TranslateService,
                private sprintTasksManagementService: SprintTasksManagementService)
    {
    }

    /**
     * Initialisation du composant
     *
     * @author Fabien Bellanger
     */
    public ngOnInit(): void
    {
        // Initialisation des variables
        // ----------------------------
        this.sprintId = +this.route.snapshot.params['sprintId'];
        this.userId   = +this.route.snapshot.params['userId'];
        this.taskId   = +this.route.snapshot.params['taskId'];
        this.sprint   = null;
        this.task     = null;
        this.taskUser = null;

        // Initialisation
        // --------------
        this.init();
    }

    /**
     * Initialisation du sprint
     *
     * @author Fabien Bellanger
     */
    private init(): void
    {
        // Initialisation du sprint
        // ------------------------
        this.sprintTasksManagementService.init(this.sprintId)
            .then(() =>
            {
                this.sprint = this.sprintTasksManagementService.sprint;

                // Recherche de la tâche
                // ---------------------
                if (this.sprint.tasks.hasOwnProperty(this.taskId))
                {
                    this.task = this.sprint.tasks[this.taskId];
                }

                // Récupération de la TaskUser
                // ---------------------------
                for (let taskUser of this.sprint.tasksUsers)
                {
                    if (taskUser.taskId === this.taskId && taskUser.userId === this.userId)
                    {
                        this.taskUser = taskUser;
                    }
                }

                if (this.task === null || this.taskUser === null)
                {
                    this.dataError();
                }
                else
                {
                    // TODO
                    alert('OK');
                }
            })
            .catch((error: any) =>
            {
                this.dataError();
            })
    }

    /**
     * Gestion des erreurs concernant les données
     * 
     * @author Fabien Bellanger
     */
    private dataError(): void
    {
        // Notification
        // ------------
        this.translateService.get('get.data.error').subscribe((msg: string) =>
        {
            this.toastyService.error(msg);
        });

        // Redirection
        // -----------
        this.router.navigate(['/sprints', this.sprintId, 'tasks-management']);
    }
}
