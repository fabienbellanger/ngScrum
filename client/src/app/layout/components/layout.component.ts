import { Component } from '@angular/core';

import { LayoutSidebarService } from '../services/layout-sidebar.service';

@Component({
    selector: 'sa-layout',
    template: `
		<sa-layout-navbar></sa-layout-navbar>
        <section id="main-container">
            <sa-layout-sidebar></sa-layout-sidebar>
		    <div class="container-fluid" id="content">
                <router-outlet (activate)="changeRoute()"></router-outlet>
            </div>
        </section>
		<sa-layout-footer></sa-layout-footer>`,
})

export class LayoutComponent
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
