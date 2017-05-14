import { Directive, ElementRef, Renderer, Input, OnChanges } from '@angular/core';

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
    //private value: string;

    @Input('saToggleSidebar') state: string;


    /**
     * Constructeur
     *
     * @author Fabien Bellanger
     * @param (ElementRef) 	el
     * @param (Renderer) 	renderer
     */
    constructor(private el: ElementRef,
                private renderer: Renderer)
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
			this.el.nativeElement.style.width = '220px';
			this.el.nativeElement.style.opacity = '0.95';
		}
		else
		{
			this.el.nativeElement.style.width = '0';
			this.el.nativeElement.style.opacity = '0';
		}
    }
}
