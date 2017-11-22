import { Injectable } from '@angular/core';

import * as moment from 'moment/moment';
import 'moment/min/locales.min'; // Pour pouvoir changer de locale

/**
 * Service pour les dates
 *
 * @author Fabien Bellanger
 */
@Injectable()
export class DateService
{
    private locale: string;

    /**
     * Constructeur
     *
     * @author Fabien Bellanger
     */
    constructor()
    {
        // TODO: Ne pas mettre la locale en dure
        this.locale = 'fr';

        moment.locale(this.locale);
    }

    /**
     * Retourne le datetime actuel
     *
     * @author Fabien Bellanger
     * @return {any|string}
     */
    public now(format?: string): any|string
    {
        if (format == null)
        {
            return moment();
        }
        else
        {
            return moment().format(format);
        }
    }

    /**
     * Retourne une instance de moment sur la date passée en paramètre
     *
     * @author Fabien Bellanger
     * @param {any}     baseDate    Valeur initiale     (Optional)
     * @param {string}  format      Format              (Optional)
     * @return {any|string}
     */
    public date(baseDate: any, format?: string): any|string
    {
        if (format == null)
        {
            return moment(baseDate);
        }
        else
        {
            return moment(baseDate).format(format);
        }
    }

    /**
     * Retire une valeur à une date
     *
     * @author Fabien Bellanger
     * @param {any}     value       Valeur à retirer
     * @param {string}  unit        Nom unit
     * @param {any}     baseDate    Valeur initiale     (Optional)
     * @param {string}  format      Format              (Optional)
     * @return {any|string}
     */
    public subtract(value: any, unit: string, baseDate?: any, format?: string): any|string
    {
        const date: any = (baseDate == null) ? moment() : moment(baseDate);

        if (format == null)
        {
            return date.subtract(value, unit);
        }
        else
        {
            return date.subtract(value, unit).format(format);
        }
    }

    /**
     * Ajoute une valeur à une date
     *
     * @author Fabien Bellanger
     * @param {any}     value       Valeur à ajouter
     * @param {string}  unit        Nom unit
     * @param {any}     baseDate    Valeur initiale     (Optional)
     * @param {string}  format      Format              (Optional)
     * @return {any|string}
     */
    public add(value: any, unit: string, baseDate?: any, format?: string): any|string
    {
        const date: any = (baseDate == null) ? moment() : moment(baseDate);

        if (format == null)
        {
            return date.add(value, unit);
        }
        else
        {
            return date.add(value, unit).format(format);
        }
    }

    /**
     * Transforme une date au format YYYY-MM-DD en date JavaScript
     *
     * @author Fabien Bellanger
     * @param {string} date Date au format YYYY-MM-DD
     * @return {Date} Date au format JavaScript
     */
    public toDate(date: string): Date
    {
        if (date === '0000-00-00')
        {
            return null;
        }
        else
        {
            return moment(date).toDate();
        }
    }

    /**
     * Transforme une date JavaScript au format YYYY-MM-DD
     *
     * @author Fabien Bellanger
     * @param {string} date Date au format YYYY-MM-DD
     * @return {Date} Date au format JavaScript
     */
    public toSqlDate(date: Date): string
    {
        return this.date(date, 'YYYY-MM-DD');
    }

    /**
     * Retourne la date du jour de Pâques
     * 
     * @author Fabien Bellanger
     * @param {number} year Année (Optionel)
     * @return {any} Date du jour de Pâques
     */
    public easterDay(year?: number): any
    {
        if (year === undefined)
        {
            year = moment().year();
        }

        // Golden Number - 1
        const G = year % 19;
        const C = Math.floor(year / 100);
        
        // Related to Epact
        const H = (C - Math.floor(C / 4) - Math.floor((8 * C + 13) / 25) + 19 * G + 15) % 30;
        
        // Number of days from 21 March to the Paschal full moon
        const I = H - Math.floor(H / 28) * (1 - Math.floor(29 / (H + 1)) * Math.floor((21 - G) / 11));
        
        // Weekday for the Paschal full moon
        const J = (year + Math.floor(year / 4) + I + 2 - C + Math.floor(C / 4)) % 7;
        
        // Number of days from 21 March to the Sunday on or before the Paschal full moon
        const L     = I - J;
        const month = 3 + Math.floor((L + 40) / 44);
        const day   = L + 28 - 31 * Math.floor(month / 4);

        return moment(new Date(year, month - 1, day));
    }

    /**
     * Liste des jours fériés
     * 
     * TODO: A faire selon la locale
     * 
     * @author Fabien Bellanger
     * @param {number} year Année (Optionel)
     * @return {any[]} Tableau des jours fériés
     */
    public getHolidayDates(year?: number): any[]
    {
        if (year === undefined)
        {
            year = moment().year();
        }

        const dates = [];
        const easterDay: any = this.easterDay(year);

        // Jour de l'an
        // ------------
        dates.push(moment(new Date(year, 0, 1)));
        
        // Fête du travail
        // ---------------
        dates.push(moment(new Date(year, 4, 1)));
        
        // Victoire des alliés
        // -------------------
        dates.push(moment(new Date(year, 4, 8)));
        
        // Fête nationale
        // --------------
        dates.push(moment(new Date(year, 6, 14)));
        
        // Assomption
        // ----------
        dates.push(moment(new Date(year, 7, 15)));
        
        // Toussaint
        // ---------
        dates.push(moment(new Date(year, 10, 1)));
        
        // Armistice
        // ---------
        dates.push(moment(new Date(year, 10, 11)));
        
        // Noël
        // ----
        dates.push(moment(new Date(year, 11, 25)));

        // Lundi de Pâques
        // ---------------
        dates.push(easterDay.add(1, 'days'));

        // Ascension
        // ---------
        dates.push(easterDay.add(39, 'days'));

        // Pentecôte
        // ---------
        dates.push(easterDay.add(50, 'days'));

        return dates;
    }

    /**
     * Est-ce un jour férié ?
     * 
     * @author Fabien Bellanger
     * @param {any} date Date
     * @return {boolean}
     */
    public isHoliday(date: any): boolean
    {
        let isHolyday: boolean    = false;
        // TODO: Passer year en paramètre de getHolidayDates()
        const holidayDates: any[] = this.getHolidayDates(date.year());

        holidayDates.map((e: any) =>
        {
            if (date.isSame(e))
            {
                isHolyday = true;
            }
        });

        return isHolyday;
    }

    /**
     * Est-ce un week-end ?
     * 
     * @author Fabien Bellanger
     * @param {any} date Date
     * @return {boolean} 
     */
    public isWeekend(date: any): boolean
    {
        let isWeekend: boolean  = false;
        const dayOfWeek: number = +date.format('E');

        if (dayOfWeek === 6 || dayOfWeek === 7)
        {
            isWeekend = true;
        }

        return isWeekend;
    }

    /**
     * Est-ce un jour travaillé ?
     * 
     * @author Fabien Bellanger
     * @param {any} date Date
     * @return {boolean}
     */
    public isWorked(date: any): boolean
    {
        return (!this.isWeekend(date) && !this.isHoliday(date));
    }
}
