import { Injectable } from '@angular/core';

/**
 * Service gérant la sidebar
 *
 * @author Fabien Bellanger
 */
@Injectable()
export class LayoutSidebarService
{
	public state: string;
	public items: Array<any>;

	/**
	 * Constructeur
	 * 
	 * @author Fabien Bellanger
	 */
	constructor()
	{
		this.state = '';
		this.items = [
			{
				'label': 'Sprints',
				'route': 'sprints',
				'picto': 'fa fa-list',
			}
		];
	}

	/**
	 * Toggle
	 * 
	 * @author Fabien Bellanger
	 */
	public toogle(): void
	{
		this.state = (this.state === 'open') ? 'close' : 'open';
	}
}