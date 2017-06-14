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
}
