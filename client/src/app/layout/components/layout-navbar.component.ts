import { Component, OnInit } from '@angular/core';

import { LayoutSidebarService } from '../services/layout-sidebar.service';

@Component({
    selector:    'sa-layout-navbar',
    templateUrl: './layout-navbar.component.html',
})

export class LayoutNavbarComponent implements OnInit
{
    /**
     * Constructeur
     *
     * @author Fabien Bellanger
	 * @param {LayoutSidebarService} LayoutSidebarService
     */
    constructor(private layoutSidebarService: LayoutSidebarService)
    {
    }

    /**
     * Initialisation du composant
     *
     * @author Fabien Bellanger
     */
    public ngOnInit(): void
    {
		
    }

	/**
	 * Toggle sur le sidebar
	 * 
	 * @author Fabien Bellanger
	 */
	private toggleSidebar(): void
	{
		this.layoutSidebarService.toogle();
	}
}
