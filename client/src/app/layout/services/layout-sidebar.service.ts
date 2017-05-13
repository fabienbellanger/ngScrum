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

	/**
	 * Constructeur
	 * 
	 * @author Fabien Bellanger
	 */
	constructor()
	{
		this.state = 'open';
	}

	/**
	 * Toggle
	 * 
	 * @author Fabien Bellanger
	 */
	public toogle(): void
	{
		if (this.state === 'open')
		{
			this.state = 'close';
		}
		else
		{
			this.state = 'open';
		}
	}
}