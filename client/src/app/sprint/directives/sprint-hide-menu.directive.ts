import { Directive, ElementRef, HostListener, Input, Renderer } from '@angular/core';

@Directive({
    selector: '[sprintHideMenu]',
})
export class SprintHideMenuDirective
{
    constructor(private el: ElementRef,
                private renderer: Renderer)
    {}

    @HostListener('mouseenter') onMouseEnter()
    {
        const part = this.el.nativeElement.querySelector('.SprintsList-Sprint-Menu');
        this.renderer.setElementStyle(part, 'display', 'block');
    }

    @HostListener('mouseleave') onMouseLeave()
    {
        const part = this.el.nativeElement.querySelector('.SprintsList-Sprint-Menu');
        this.renderer.setElementStyle(part, 'display', 'none');
    }
}
