import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { SprintService } from './sprint.service';
import { ToolboxService } from '../../shared';

@Injectable()

export class SprintChartsService
{
    /**
     * Constructeur
     *
     * @author Fabien Bellanger
     * @param {SprintService}       sprintService
     * @param {TranslateService}    translateService
     * @param {ToolboxService}      toolboxService
     */
    constructor(private sprintService: SprintService,
                private translateService: TranslateService,
                private toolboxService: ToolboxService)
    {
    }

    /**
     * Initialisation du graphique des heures totales / restantes
     *
     * @author Fabien Bellanger
     * @return {any} Données pour le graphique
     */
    public getPieChartTotalRemainingHours(): any
    {
        let totalLabel: string     = '';
        let remainingLabel: string = '';
        this.translateService.get('total.duration').subscribe((res: string) =>
        {
            totalLabel = res;
        });
        this.translateService.get('remaining.duration').subscribe((res: string) =>
        {
            remainingLabel = res;
        });

        return {
            type:    'pie',
            labels:  [
                remainingLabel,
                totalLabel,
            ],
            data:    [
                this.sprintService.remainingDuration,
                this.sprintService.totalDuration,
            ],
            options: {
                responsive: false, 
                legend:     {
                    position: 'left',
                }, 
                title:      {
                    display: true,
                    text:    'Heures travaillées / heures restantes',
                },
            },
        };
    }

    /**
     * Initialisation du graphique des types de tâche
     *
     * @author Fabien Bellanger
     * @return {any} Données pour le graphique
     */
    public getPieChartTaskTypes(): any
    {
        // Labels
        // ------
        const typeslabel: any = {};
        const typesData:  any = {};
        const types:      any = this.sprintService.sprint.taskTypes;
        const tasks: any[]    = this.sprintService.sprint.tasks;

        this.translateService.get([
            'task.type.bug',
            'task.type.new',
            'task.type.improvement',
            'task.type.test',
            'task.type.configuration',
        ]).subscribe((translationObject: string[]) =>
        {
            for (const index in types)
            {
                if (types.hasOwnProperty(index))
                {
                    typeslabel[index] = translationObject['task.type.' + types[index]];
                }
            }
        });

        // Données
        // -------

        // Initialisation
        for (const index in types)
        {
            if (types.hasOwnProperty(index))
            {
                typesData[index] = 0;
            }
        }

        // Calculs
        for (const task of tasks)
        {
            if (task.list.length > 0)
            {
                for (const taskUser of task.list)
                {
                    typesData[task.type] += +taskUser.workedDuration;
                }
            }
        }

        return {
            type:    'pie',
            labels:  this.toolboxService.objectToArray(typeslabel),
            data:    this.toolboxService.objectToArray(typesData),
            options: {
                responsive: false, 
                legend:     {
                    position: 'left',
                }, 
                title:      {
                    display: true,
                    text:    'Types de tâches',
                },
            },
        };
    }

    /**
     * Calcul des données pour l'affichage du graphique de variations des coefficients des utilisateurs
     *
     * @author Fabien Bellanger
     * @return {any} Données
     */
    private getLineChartUsesCoefficientData(): any
    {
        // Traitement des données
        // ----------------------
        const data: any      = {};
        const tasks: any[] = this.sprintService.sprint.tasks;

        for (const task of tasks)
        {
            if (task.list.length > 0)
            {
                for (const taskUser of task.list)
                {
                    if (!data.hasOwnProperty(taskUser.date))
                    {
                        data[taskUser.date] = {};
                    }
                    if (!data[taskUser.date].hasOwnProperty(taskUser.userId))
                    {
                        data[taskUser.date][taskUser.userId] = {
                            duration:       0,
                            workedDuration: 0,
                        };
                    }
                    data[taskUser.date][taskUser.userId].duration += +taskUser.duration;
                    data[taskUser.date][taskUser.userId].workedDuration += +taskUser.workedDuration;
                }
            }
        }

        // Calcul des coefficients
        // -----------------------
        for (const date in data)
        {
            if (data.hasOwnProperty(date))
            {
                for (const userId in data[date])
                {
                    if (data[date].hasOwnProperty(userId))
                    {
                        // On arrondi le coefficient à 2 chiffres après la virgule
                        data[date][userId] = Math.round(
                            data[date][userId].duration / data[date][userId].workedDuration * 100
                        ) / 100;
                    }
                }
            }
        }

        return this.toolboxService.ksort(data);
    }

    /**
     * Initialisation du graphique de variations des coefficients des utilisateurs
     *
     * @author Fabien Bellanger
     * @return {any} Données pour le graphique
     */
    public getLineChartUsesCoefficient(): any
    {
        // Traitement des données
        // ----------------------
        const data: any = this.getLineChartUsesCoefficientData();

        // Labels triés par date croissante
        // --------------------------------
        const labels: string[] = Object.keys(data).sort();

        // Datasets
        // --------
        const datasetsObject: any = {};
        let lastData: number;

        for (const userId in this.sprintService.sprint.users)
        {
            if (this.sprintService.sprint.users.hasOwnProperty(userId))
            {
                // Initialisation de la structure
                // ------------------------------
                datasetsObject[userId] = {
                    label: this.sprintService.sprint.users[userId].firstname,
                    fill:  false,
                    data:  [],
                };

                // Ajout des données
                // -----------------
                for (const date in data)
                {
                    if (data[date].hasOwnProperty(userId))
                    {
                        datasetsObject[userId].data.push(data[date][userId]);
                    }
                    else
                    {
                        // Quand il n'y a pas de valeur on prend la précédente si elle existe, 0 sinon
                        lastData = (datasetsObject[userId].data.length === 0)
                            ? 0
                            : datasetsObject[userId].data[datasetsObject[userId].data.length - 1];

                        datasetsObject[userId].data.push(lastData);
                    }
                }
            }
        }

        // Conversion Object => Array
        // --------------------------
        const datasets: any[] = Object.keys(datasetsObject).map((k: any) => datasetsObject[k]);

        return {
            type:     'line',
            labels:   labels,
            datasets: datasets,
        };
    }
}
