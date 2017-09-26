import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatSnackBar } from '@angular/material';

import { TranslateService } from '@ngx-translate/core';

import { SprintDeleteDialogComponent } from './dialogs/sprint-delete-dialog.component';
import { ApiSprintService } from '../../api';

@Component({
    selector:    'sa-sprint-list',
    templateUrl: './sprint-list.component.html',
})

export class SprintListComponent implements OnInit
{
    public sprints: any[]   = [];
    public loading: boolean = true;
    public state: string;

    /**
     * Constructeur
     *
     * @author Fabien Bellanger
     * @param {ApiSprintService} apiSprintService
     * @param {TranslateService} translateService
     * @param {Router}           router
     * @param {MatDialog}        dialog
     * @param {MatSnackBar}      snackBar
     */
    constructor(private apiSprintService: ApiSprintService,
                private translateService: TranslateService,
                private router: Router,
                private dialog: MatDialog,
                private snackBar: MatSnackBar)
    {
    }

    /**
     * Initialisation du composant
     *
     * @author Fabien Bellanger
     */
    public ngOnInit(): void
    {
        this.getSprints(this.state);
    }

    /**
     * Liste des sprints
     *
     * @author Fabien Bellanger
     * @param {string} state Etat {all, inProgress, finished}
     */
    public getSprints(state: string): void
    {
        if (state !== 'all' && state !== 'inProgress' && state !== 'finished')
        {
            state = 'inProgress';
        }
        this.state   = state;
        this.loading = true;

        this.apiSprintService.getList(state)
            .then((sprints: any) =>
            {
                this.sprints = sprints;
                this.loading = false;
            })
            .catch(() =>
            {
                console.error('[error] Get sprints list');

                this.loading = false;
            });
    }

    /**
     * Redirection vers la gestion des tâches
     *
     * @author Fabien Bellanger
     * @param {any} sprint Sprint
     */
    public redirectToTasksManagement(sprint: any): void
    {
        if (sprint.initialDuration !== null)
        {
            this.router.navigate(['/sprints', sprint.id, 'tasks-management-list']);
        }
    }

    /**
     * Suppression d'un sprint
     *
     * @author Fabien Bellanger
     * @param {any} sprint Sprint
     */
    public deleteSprint(sprint: any): void
    {
        const dialog = this.dialog.open(SprintDeleteDialogComponent, {
            data: {
                confirm: true,
            },
            disableClose: false,
        });

        dialog.afterClosed().subscribe((result: any) =>
        {
            this.translateService.get([
                'delete.sprint.success',
                'delete.sprint.error',
                'error',
                'success',
            ]).subscribe((translationObject: Object) =>
            {
                if (result === true)
                {
                    this.apiSprintService.deleteSprint(sprint.id)
                        .then(() =>
                        {
                            // Rechargement des données
                            // ------------------------
                            this.getSprints(this.state);

                            // Notification
                            // ------------
                            this.snackBar.open(
                                translationObject['delete.sprint.success'],
                                translationObject['success'],
                                {
                                    duration: 3000,
                                });
                        })
                        .catch(() =>
                        {
                            this.snackBar.open(
                                translationObject['delete.sprint.error'],
                                translationObject['error'],
                                {
                                    duration: 3000,
                                });
                        });
                }
            });
        });
    }
}
