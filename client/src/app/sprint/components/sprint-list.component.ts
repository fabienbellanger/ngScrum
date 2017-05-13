import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
    selector:    'sa-sprint-list',
    templateUrl: './sprint-list.component.html',
})

export class SprintListComponent implements OnInit
{
    private sidebarWidth: string;

    @ViewChild('sidebar') private sidebar: any;

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

    private toggleSidebar(): void
    {
        let width: number = this.sidebar.nativeElement.offsetWidth;

        if (width === 0)
        {
            this.sidebar.nativeElement.style.width = '220px';
        }
        else
        {
            this.sidebar.nativeElement.style.width = '0';
        }
    }
}
