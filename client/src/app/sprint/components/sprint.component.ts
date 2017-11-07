import { Component } from '@angular/core';

import { LayoutSidebarService } from '../../layout/services/layout-sidebar.service';

@Component({
    selector: 'sa-layout',
    template: `<router-outlet (activate)="changeRoute()"></router-outlet>`,
})

export class SprintComponent
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
