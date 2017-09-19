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
     * @return {any}
     */
    public now(format?: string): any
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
     * @return {any}
     */
    public date(baseDate: any, format?: string): any
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
     * @return {any}
     */
    public subtract(value: any, unit: string, baseDate?: any, format?: string): any
    {
        let date: any = (baseDate == null) ? moment() : moment(baseDate);

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
     * @return {any}
     */
    public add(value: any, unit: string, baseDate?: any, format?: string): any
    {
        let date: any = (baseDate == null) ? moment() : moment(baseDate);

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
        return moment(date).toDate();
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
}
