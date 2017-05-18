import { Component, OnInit } from '@angular/core';

import { LayoutSidebarService } from '../services/layout-sidebar.service';
import { UserService } from '../../auth';

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
	 * @param {LayoutSidebarService} layoutSidebarService
	 * @param {UserService}          userService
     */
    constructor(private layoutSidebarService: LayoutSidebarService,
                private userService: UserService)
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
