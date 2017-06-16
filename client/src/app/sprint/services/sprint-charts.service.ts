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
	 * Calcul des données pour l'affichage du graphique de variations des coefficients des utilisateurs
	 * 
	 * @author Fabien Bellanger
	 * @return {any} Données
	 */
	private getLineChartUsesCoefficientData(): any
	{
		// Traitement des données
		// ----------------------
		let data:    any   = {};
		const tasks: any[] = this.sprintService.sprint.tasks;

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
				// On arrondi le coefficient à 1 chiffre après la virgule
				data[date][userId] = Math.round(
					data[date][userId].duration / data[date][userId].workedDuration * 10
				) / 10;
			}
		}

		return data;
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
		let data: any = this.getLineChartUsesCoefficientData();

		// Labels
		// ------
		const labels: string[] = Object.keys(data);

		// Datasets
		// --------
		let datasetsObject: any = {};
		let lastData:       number;
		
		for (let userId in this.sprintService.sprint.users)
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
			for (let date in data)
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

		// Conversion Object => Array
        // --------------------------
        let datasets: any[] = Object.keys(datasetsObject).map((k: any) => datasetsObject[k]);

		return {
			type:     'line',
			labels:   labels,
			datasets: datasets,
		};
	}
}
    