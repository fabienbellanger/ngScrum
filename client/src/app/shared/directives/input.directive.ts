import { Directive, ElementRef, Renderer, Input, OnChanges } from '@angular/core';

@Directive({
    selector:   '[saInput]',
    host:       {
        '(focus)': 'onFocus()',
        '(blur)':  'onBlur()',
    },
})

/**
 * Directive styliser les inputs
 *
 * @author Fabien Bellanger
 */
export class InputDirective implements OnChanges
{
    /*
     |---------------------------------------------------------------------------
     | Variables
     |---------------------------------------------------------------------------
     */
    private value: string;

    @Input() set saInput(value: string)
    {
        this.value = value;
    }


    /**
     * Constructeur
     *
     * @author Fabien Bellanger
     * @param (ElementRef) el
     * @param (Renderer) renderer
     */
    constructor(private el: ElementRef,
                private renderer: Renderer)
    {
        this.addHasLabelClass();
    }

    /**
     * Appeler à chaque changement des propriétés de l'input
     *
     * @author Fabien Bellanger
     */
    public ngOnChanges(): void
    {
        this.addHasLabelClass();
    }

    /**
     * Mise à jour du style si l'input possède déjà une valeur
     *
     * @author Fabien Bellanger
     */
    private addHasLabelClass(): void
    {
        if (this.value !== '' && this.value !== undefined)
        {
            let parentClassName: string = this.el.nativeElement.parentNode.className;

            if (parentClassName.search('has-label') === -1)
            {
                this.el.nativeElement.parentNode.className += ' has-label';
            }
        }
    }

    /**
     * Focus sur l'input
     *
     * @author Fabien Bellanger
     */
    public onFocus(): void
    {
        let parentClassName: string = this.el.nativeElement.parentNode.className;

        if (parentClassName.search('is-focused') === -1)
        {
            this.el.nativeElement.parentNode.className += ' is-focused';
        }
        if (parentClassName.search('has-label') === -1)
        {
            this.el.nativeElement.parentNode.className += ' has-label';
        }
    }

    /**
     * Perte du focus
     *
     * @author Fabien Bellanger
     */
    public onBlur(): void
    {
        let classes: Array<string> = this.el.nativeElement.parentNode.className.split(' ');
        let indexToRemove: number;

        if (this.value === '' || this.value === undefined)
        {
            indexToRemove = classes.indexOf('has-label');
            if (indexToRemove !== -1)
            {
                classes.splice(indexToRemove, 1);
            }
        }

        indexToRemove = classes.indexOf('is-focused');
        if (indexToRemove !== -1)
        {
            classes.splice(indexToRemove, 1);
        }

        this.el.nativeElement.parentNode.className = classes.join(' ');
    }
}
