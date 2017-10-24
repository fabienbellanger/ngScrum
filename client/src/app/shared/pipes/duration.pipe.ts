import { Pipe, PipeTransform } from '@angular/core';
import 'moment/min/locales.min'; // Pour pouvoir changer de locale

/**
 * Duration pipe
 *
 * @author Fabien Bellanger
 */
@Pipe({name: 'duration'})

export class DurationPipe implements PipeTransform
{
    private hoursInDay: number = 7;
    private daysInWeek: number = 5;

    /**
     * Transformation
     *
     * @author Fabien Bellanger
     * @param {number}      value   Valeur à modifier
     * @param {string}      type    Type d'affichage {auto, hour, day}
     * @return {string}     Texte avec des <br>
     */
    public transform(value: number, type: string = 'auto'): any
    {
        value = +value;

        if (typeof value !== 'number')
        {
            value = 0;
        }

        return this.displayDuration(value, type).replace('.', ',');
    }

    /**
     * Affichage des durées
     *
     * @author Fabien Bellanger
     * @param {number} value Valeur
     * @param {string} type  Type
     * @return {string}
     */
    private displayDuration(value: number, type: string): string
    {
        let s: string = '';

        if (type === 'hour')
        {
            // Type 'hour'
            // -----------
            s += Math.round(value * 10) / 10 + ' h';
        }
        else if (type === 'day')
        {
            // Type 'day'
            // ----------
            const dayTimeObject: any = this.getDayDurationObject(value);

            if (dayTimeObject.days !== 0)
            {
                s += dayTimeObject.days + ' j';
                /*if (dayTimeObject.days >= 2)
                {
                    s += 's';
                }*/
                if (dayTimeObject.hours !== 0)
                {
                    s += ' ' + dayTimeObject.hours + ' h';
                }
            }
            else
            {
                if (dayTimeObject.hours !== 0)
                {
                    s += dayTimeObject.hours + ' h';
                }
            }
        }
        else
        {
            // Type 'auto'
            // -----------
            const weekTimeObject: any = this.getWeekDurationObject(value);

            if (weekTimeObject.weeks !== 0)
            {
                s += weekTimeObject.weeks + ' s';
                /*if (weekTimeObject.weeks >= 2)
                {
                    s += 's';
                }*/
                if (weekTimeObject.days !== 0)
                {
                    s += ' ' + weekTimeObject.days + ' j';
                    /*if (weekTimeObject.days >= 2)
                    {
                        s += 's';
                    }*/
                    if (weekTimeObject.hours !== 0)
                    {
                        s += ' ' + weekTimeObject.hours + ' h';
                    }
                }
                else
                {
                    if (weekTimeObject.hours !== 0)
                    {
                        s += ' ' + weekTimeObject.hours + ' h';
                    }
                }
            }
            else
            {
                if (weekTimeObject.days !== 0)
                {
                    s += weekTimeObject.days + ' j';
                    if (weekTimeObject.days >= 2)
                    {
                        s += 's';
                    }
                    if (weekTimeObject.hours !== 0)
                    {
                        s += ' ' + weekTimeObject.hours + ' h';
                    }
                }
                else
                {
                    if (weekTimeObject.hours !== 0)
                    {
                        s += weekTimeObject.hours + ' h';
                    }
                }
            }
        }

        if (s === '')
        {
            s = '0 h';
        }

        return s;
    }

    /**
     * Transformation de la durée en tableau pour l'affichage auto
     *
     * @author Fabien Bellanger
     * @param {number} value heures
     * @return {any}
     */
    private getWeekDurationObject(value: number): any
    {
        if (value <= 0)
        {
            return {
                hours: 0,
                days:  0,
                weeks: 0,
            };
        }
        else
        {
            const hours: number = Math.round(value % this.hoursInDay * 10) / 10;
            let days:    number = Math.floor(value / this.hoursInDay);
            let weeks:   number = 0;

            if (days > 0)
            {
                weeks = Math.floor(days / this.daysInWeek);
                if (weeks > 0)
                {
                    days = Math.round(days % this.daysInWeek * 10) / 10;
                }
            }

            return {
                hours: hours,
                days:  days,
                weeks: weeks,
            };
        }
    }

    /**
     * Transformation de la durée en tableau pour l'affichage par jour
     *
     * @author Fabien Bellanger
     * @param {number} value heures
     * @return {any}
     */
    private getDayDurationObject(value: number): any
    {
        if (value <= 0)
        {
            return {
                hours: 0,
                days:  0,
            };
        }
        else
        {
            const hours: number = Math.round(value % this.hoursInDay * 10) / 10;
            const days: number  = Math.floor(value / this.hoursInDay);

            return {
                hours: hours,
                days:  days,
            };
        }
    }
}
