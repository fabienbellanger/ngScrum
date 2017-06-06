import { Pipe, PipeTransform } from '@angular/core';

/**
 * Custome percent pipe
 *
 * @author Fabien Bellanger
 */
@Pipe({name: 'percentFr'})

export class PercentPipe implements PipeTransform
{
    /**
     * Transformation
     *
     * @author Fabien Bellanger
     * @param {number}      value   Valeur à modifier
     * @param {number}      digits  Précision (default 2)
     * @return {string}     Texte avec des <br>
     */
    public transform(value: number, digits: number = 2): any
    {
        value  = +value;
        digits = +digits;

        if (typeof value !== 'number')
        {
            value = 0;
        }
        if (typeof digits !== 'number')
        {
            digits = 2;
        }

        const digit: number  = Math.pow(10, digits);
        let newValue: string = Math.floor(value * digit) / digit + '';

        return newValue.replace('.', ',') + ' %';
    }
}
