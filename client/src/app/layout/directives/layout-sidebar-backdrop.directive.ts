import { Directive, ElementRef, Input, OnChanges, Renderer } from '@angular/core';

import { LayoutSidebarService } from '../services/layout-sidebar.service';

@Directive({
    selector: '[saSidebarBackdrop]',
})

/**
 * Directive toggle sidebar
 *
 * @author Fabien Bellanger
 */
export class LayoutSidebarBackdropDirective implements OnChanges
{
    @Input('saSidebarBackdrop') state: string;

    /**
     * Constructeur
     *
     * @author Fabien Bellanger
     * @param (ElementRef)    el
     * @param (Renderer)    renderer
     */
    constructor(private el: ElementRef,
                private renderer: Renderer,
                private layoutSidebarService: LayoutSidebarService)
    {
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
            this.el.nativeElement.style.backgroundColor = 'rgba(50, 50, 50, 0.7)';
            this.el.nativeElement.style.zIndex          = '90';
        }
        else
        {
            this.el.nativeElement.style.backgroundColor = 'rgba(50, 50, 50, 0)';
            this.el.nativeElement.style.zIndex          = '0';
        }
    }
}
