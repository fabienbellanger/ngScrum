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
     * @return {any}
     */
    public add(value: any, unit: string, baseDate?: any, format?: string): any
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

    public getHolidayDates(year?: number): any[]
    {
        const dates = [];
        const easterDay: any = this.easterDay(year);

        // Lundi de Pâques
        dates.push(easterDay.add(1, 'days'));

        // Ascension
/*

moment.fn.ascension = function (Y) {
      if (Y === undefined) {
        Y = this.year();
      }
      return moment.fn.paques(Y).add(39, "days");
    };

    moment.fn.pentecote = function (Y) {
      if (Y === undefined) {
        Y = this.year();
      }
      return moment.fn.paques(Y).add(50, "days");
    };

    moment.fn.jourDeLAn = function (Y) {
      if (Y === undefined) {
        Y = this.year();
      }
      return moment("1-1-" + Y, "DD-MM-YYYY");
    };

    moment.fn.feteDuTravail = function (Y) {
      if (Y === undefined) {
        Y = this.year();
      }
      return moment("1-5-" + Y, "DD-MM-YYYY");
    };

    moment.fn.victoireDeAllies = function (Y) {
      if (Y === undefined) {
        Y = this.year();
      }
      return moment("8-5-" + Y, "DD-MM-YYYY");
    };

    moment.fn.feteNationale = function (Y) {
      if (Y === undefined) {
        Y = this.year();
      }
      return moment("14-7-" + Y, "DD-MM-YYYY");
    };

    moment.fn.assomption = function (Y) {
      if (Y === undefined) {
        Y = this.year();
      }
      return moment("15-8-" + Y, "DD-MM-YYYY");
    };

    moment.fn.toussaint = function (Y) {
      if (Y === undefined) {
        Y = this.year();
      }
      return moment("1-11-" + Y, "DD-MM-YYYY");
    };

    moment.fn.armistice = function (Y) {
      if (Y === undefined) {
        Y = this.year();
      }
      return moment("11-11-" + Y, "DD-MM-YYYY");
    };

    moment.fn.noel = function (Y) {
      if (Y === undefined) {
        Y = this.year();
      }
      return moment("25-12-" + Y, "DD-MM-YYYY");
    };

    var listeFerie = {
      "Jour de l'an": moment.fn.jourDeLAn,
      "Fête du travail": moment.fn.feteDuTravail,
      "Victoire des alliés": moment.fn.victoireDeAllies,
      "Fête Nationale": moment.fn.feteNationale,
      "Assomption": moment.fn.assomption,
      "Toussaint": moment.fn.toussaint,
      "Armistice": moment.fn.armistice,
      "Noël": moment.fn.noel,
      "Pâques": moment.fn.paques,
      "Lundi de Pâques": moment.fn.lundiDePaques,
      "Ascension": moment.fn.ascension,
      "Pentecôte": moment.fn.pentecote
    };

*/

        return dates;
    }
}
