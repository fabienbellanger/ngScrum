import { Pipe, PipeTransform } from '@angular/core';

/**
 * Hour pipe
 *
 * @author Fabien Bellanger
 */
@Pipe({name: 'hour'})

export class HourPipe implements PipeTransform
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
            return '0h';
        }

        value = value + '';

        return value.replace('.', ',') + 'h';
    }
}
