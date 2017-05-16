import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'sa-layout',
    template: `
		<sa-layout-navbar></sa-layout-navbar>
        <section id="main-container">
            <sa-layout-sidebar></sa-layout-sidebar>
		    <div class="container-fluid" id="content">
                <router-outlet></router-outlet>
            </div>
        </section>
		<sa-layout-footer></sa-layout-footer>
	`,
})

export class LayoutComponent implements OnInit
{
    /**
     * Constructeur
     *
     * @author Fabien Bellanger
     */
    constructor()
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
