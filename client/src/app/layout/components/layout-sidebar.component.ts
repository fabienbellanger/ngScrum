import { Component, OnInit } from '@angular/core';

import { LayoutSidebarService } from '../services/layout-sidebar.service';

@Component({
    selector:    'sa-layout-sidebar',
    templateUrl: './layout-sidebar.component.html',
})

export class LayoutSidebarComponent implements OnInit
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
}
