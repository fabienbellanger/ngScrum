import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'sa-layout',
    template: `<router-outlet></router-outlet>`,
})

export class SprintComponent implements OnInit
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
