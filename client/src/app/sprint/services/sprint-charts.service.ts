import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { Sprint } from '../../models';

import { SprintService } from './sprint.service';

@Injectable()

export class SprintChartsService
{
	/**
     * Constructeur
     *
     * @author Fabien Bellanger
	 * @param {SprintService} sprintService
     */
    constructor(private sprintService: SprintService,
				private translateService: TranslateService)
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
		let totalLabel:     string = '';
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
			type:   'pie',
			labels: [
				remainingLabel,
				totalLabel,
			],
			data:   [
				this.sprintService.remainingDuration,
				this.sprintService.totalDuration,
			],
		};
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
		let data:    any      = {};
		const tasks: any[]    = this.sprintService.sprint.tasks;
		for (let task of tasks)
		{
			if (task.list.length > 0)
			{
				for (let taskUser of task.list)
				{
					if (!data.hasOwnProperty(taskUser.date))
					{
						data[taskUser.date] = {};
					}
					if (!data[taskUser.date].hasOwnProperty(taskUser.userId))
					{
						data[taskUser.date][taskUser.userId] = {
							duration: 0,
							workedDuration: 0,
						};
					}
					data[taskUser.date][taskUser.userId].duration 		+= +taskUser.duration;
					data[taskUser.date][taskUser.userId].workedDuration += +taskUser.workedDuration;
				}
			}
		}

		// Calcul des coefficients
		// -----------------------
		for (let date in data)
		{
			for (let userId in data[date])
			{
				data[date][userId] = data[date][userId].duration / data[date][userId].workedDuration;
			}
		}

		// Labels
		// ------
		const labels: string[] = Object.keys(data);

		// Datasets
		// --------
		// TODO: à reprendre
		let datasetsTmp: any = {};
		for (let date in data)
		{
			for (let userId in data[date])
			{
				if (!datasetsTmp.hasOwnProperty(userId))
				{
					datasetsTmp[userId] = {
						label: 'ID ' + userId,
						fill:  false,
						data:  [],
					};
				}
				datasetsTmp[userId].data.push(1);
			}
		}
		// Conversion Object => Array
        // --------------------------
        let datasets: any[] = Object.keys(datasetsTmp).map((k: any) => datasetsTmp[k]);

console.log(data, this.sprintService.sprint.users, datasets);

		return {
			type:     'line',
			labels:   labels,
			datasets: datasets,
		};
	}
}
    