import { Component, } from '@angular/core';

import { LayoutSidebarService } from '../../layout/services/layout-sidebar.service';

@Component({
    selector: 'sa-statistics',
    template: `<router-outlet></router-outlet>`,
})

export class StatisticsComponent
{
    /**
     * Constructeur
     *
     * @author Fabien Bellanger
     * @param {LayoutSidebarService} layoutSidebarService
     */
    constructor(private layoutSidebarService: LayoutSidebarService)
    {
    }
    
    /**
     * Changement de route
     *
     * @author Fabien Bellanger
     */
    public changeRoute(): void
    {
        // On referme la sidebar en mode mobile       
        this.layoutSidebarService.mobileClose();
    }
}
