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
        <sa-layout-footer></sa-layout-footer>
        <div [ngClass]="{'layout-sidebar-fade-out': layoutSidebarService.state === 'open',
                         'layout-sidebar-fade-in':  layoutSidebarService.state !== 'open'}"
             (click)="toggleSidebar()"></div>`,
})

export class LayoutComponent
{
    /**
     * Constructeur
     *
     * @author Fabien Bellanger
     * @param {LayoutSidebarService} layoutSidebarService
     */
    constructor(public layoutSidebarService: LayoutSidebarService)
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

    /**
     * Toggle de la sidebar
     * 
     * @author Fabien Bellanger
     */
    public toggleSidebar(): void
    {
        this.layoutSidebarService.toggle();
    }
}
