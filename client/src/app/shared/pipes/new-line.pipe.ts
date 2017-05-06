import { Pipe, PipeTransform } from '@angular/core';

/**
 * NewLine pipe
 *
 * @author Fabien Bellanger
 */
@Pipe({name: 'newLine'})

export class NewLinePipe implements PipeTransform
{
    /**
     * Transformation
     *
     * @author Fabien Bellanger
     * @param {string}      value   Valeur à modifier
     * @param {string[]}    args    Tableau des arguments
     * @return {string}     Texte avec des <br>
     */
    public transform(value: string, args: string[]): any
    {
        if (value === null || typeof value === 'undefined')
        {
            return '';
        }
        return value.replace(/(?:\r\n|\r|\n)/g, '<br>');
    }
}
