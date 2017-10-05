import { Directive, ElementRef, HostListener, Input, Renderer } from '@angular/core';

@Directive({
    selector: '[saSprintHideMenu]',
})
export class SprintHideMenuDirective
{
    /**
     * Cponstructeur
     *
     * @author Fabien Bellanger
     * @param {ElementRef} el
     * @param {Renderer}   renderer
     */
    constructor(private el: ElementRef,
                private renderer: Renderer)
    {}

    /**
     * Au survole de la souris, on affiche le menu
     * 
     * @author Fabien Bellanger
     */
    @HostListener('mouseenter') onMouseEnter()
    {
        const part = this.el.nativeElement.querySelector('.SprintsList-Sprint-Menu');

        this.renderer.setElementStyle(part, 'display', 'block');
    }

    /**
     * Quand la souris quitte l'élément, on masque le menu
     * 
     * @author Fabien Bellanger
     */
    @HostListener('mouseleave') onMouseLeave()
    {
        const part = this.el.nativeElement.querySelector('.SprintsList-Sprint-Menu');
        
        this.renderer.setElementStyle(part, 'display', 'none');
    }
}
