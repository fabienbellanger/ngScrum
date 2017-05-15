import { Directive, ElementRef, Renderer, Input, OnChanges } from '@angular/core';

import { LayoutSidebarService } from '../services/layout-sidebar.service';

@Directive({
    selector:   '[saToggleSidebar]',
})

/**
 * Directive toggle sidebar
 *
 * @author Fabien Bellanger
 */
export class LayoutSidebarToggleDirective implements OnChanges
{
    /*
     |---------------------------------------------------------------------------
     | Variables
     |---------------------------------------------------------------------------
     */
    private width: number           = 220;
    private responsiveWidth: number = 900;

    @Input('saToggleSidebar') state: string;


    /**
     * Constructeur
     *
     * @author Fabien Bellanger
     * @param (ElementRef) 	el
     * @param (Renderer) 	renderer
     */
    constructor(private el: ElementRef,
                private renderer: Renderer,
                private layoutSidebarService: LayoutSidebarService)
    {
        if (window.innerWidth < this.responsiveWidth)
        {
            // Mobile
            this.layoutSidebarService.state = 'close';
        }
        else
        {
            // Desktop
            this.layoutSidebarService.state = 'open';
        }
    }

    /**
     * Appeler à chaque changement des propriétés de l'input
     *
     * @author Fabien Bellanger
     */
    public ngOnChanges(): void
    {
        if (this.state === 'open')
		{
            this.el.nativeElement.style.width   = this.width + 'px';
		}
		else
		{
            this.el.nativeElement.style.width   = '0';
		}
    }
}
