import { Pipe, PipeTransform } from '@angular/core';
import { DateService } from '../services/date.service';

/**
 * Moment pipe
 *
 * @author Fabien Bellanger
 */
@Pipe({name: 'moment'})

export class MomentPipe implements PipeTransform
{
    /**
     * Constructeur
     *
     * @author Fabien Bellanger
     * @param {DateService}     dateService
     */
    constructor(private dateService: DateService)
    {
    }

    /**
     * Transformation
     *
     * @author Fabien Bellanger
     * @param {string}  value   Valeur à modifier
     * @param {string}  format  Format de date souhaité
     * @return {string} Date au bon format
     */
    public transform(value: string, format: string): string
    {
        return (value !== null) ? this.dateService.date(value, format) : '';
    }
}
