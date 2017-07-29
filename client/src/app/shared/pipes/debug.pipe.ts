import { Pipe, PipeTransform } from '@angular/core';

/**
 * Debug pipe
 *
 * @author Fabien Bellanger
 */
@Pipe({name: 'debug'})

export class DebugPipe implements PipeTransform
{
    /**
     * Transformation
     *
     * @author Fabien Bellanger
     * @param {value}   any   Valeur à afficher
     * @return {string} Texte avec des <pre>
     */
    public transform(value: any): any
    {
        if (typeof value !== 'object')
        {
            return null;
        }

        return '<pre>' + JSON.stringify(value, null, 2) + '</pre>';
    }
}
