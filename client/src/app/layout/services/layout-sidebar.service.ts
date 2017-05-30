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
				'route': 'sprints-list',
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

    /**
     * Referme la sidebar en mode mobile
     *
     * @author Fabien Bellanger
     */
    public mobileClose(): void
    {
        if (window.innerWidth <= 640)
        {
            this.state = 'close';
        }
    }
}
