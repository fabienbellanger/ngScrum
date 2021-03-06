import { Injectable } from '@angular/core';

/**
 * Service contenant divers fonctions utiles
 *
 * @author Fabien Bellanger
 */
@Injectable()
export class ToolboxService
{
    /**
     * Equivalent du number_format de PHP
     *
     * @author Fabien Bellanger
     * @param {number}  value
     * @param {number}  nbDecimals
     * @param {string}  decimalIndicator
     * @param {string}  thousandsSeparator
     * @return {string}
     */
    public number_format(value: number,
                         nbDecimals: number,
                         decimalIndicator: string,
                         thousandsSeparator: string): string
    {
        let numberStr: string  = (value + '').replace(/[^0-9+\-Ee.]/g, ''),
            n: number          = !isFinite(+numberStr) ? 0 : +numberStr,
            precision: number  = !isFinite(+nbDecimals) ? 0 : Math.abs(nbDecimals),
            separator: string  = (typeof thousandsSeparator === 'undefined') ? ',' : thousandsSeparator,
            indicator: string  = (typeof decimalIndicator === 'undefined') ? '.' : decimalIndicator,
            result: any[] = [],
            toFixedFix: any    = (n: number, precision: number) =>
            {
                let k: number = Math.pow(10, precision);

                return '' + (Math.round(n * k) / k).toFixed(precision);
            };

        result = (precision ? toFixedFix(n, precision) : '' + Math.round(n)).split('.');
        if (result[0].length > 3)
        {
            result[0] = result[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, separator);
        }

        if ((result[1] || '').length < precision)
        {
            result[1] = result[1] || '';
            result[1] += new Array(precision - result[1].length + 1).join('0');
        }

        return result.join(indicator);
    }

    /**
     * Equivalent partiel du round de PHP
     *
     * @author Fabien Bellanger
     * @param {number}  value
     * @param {number}  precision (default 0)
     * @return {number}
     */
    public round(value: number, precision: number = 0): number
    {
        let m: number, f: number, isHalf: boolean, sgn: number;

        m      = Math.pow(10, precision);
        value  = value * m;
        sgn    = (value > 0) ? 1 : -1;
        isHalf = value % 1 === 0.5 * sgn;
        f      = Math.floor(value);

        return (isHalf ? f + sgn : Math.round(value)) / m;
    }

    /**
     * Format du prix
     *
     * TODO: Détection de la locale et de la devise
     *
     * @author Fabien Bellanger
     * @param {number}  value
     * @return {number}
     */
    public price_format(value: number): number
    {
        if (typeof value !== 'number')
        {
            return 0;
        }
        else
        {
            const lang: string = 'fr';
            let newValue: number;

            if (lang === 'fr')
            {
                newValue = this.round(value, 2);
            }
            else
            {
                // Par défault => fr
                newValue = this.round(value, 2);
            }

            return newValue;
        }
    }

    /**
     * Equivalent du array_values de PHP
     *
     * @author Fabien Bellanger
     * @param {any}  obj
     * @return {any[]}
     */
    public array_values(obj: any): any[]
    {
        const array: any[] = [];
        let key: string    = '';

        for (key in obj)
        {
            if (obj.hasOwnPrioperty(key))
            {
                array[array.length] = obj[key];
            }
        }

        return array;
    }

    /**
     * Tri d'un tableau sur les clés croissantes
     *
     * @author Fabien Bellanger
     * @param {any} arrayToSort Tableau à trier
     * @return {any} Tableau trié
     */
    public ksort(arrayToSort: any): any
    {
        const sortedArray: any[]  = [];
        let keysArray:     any[]  = [];
        let n:             number = 0;

        for (const key in arrayToSort)
        {
            if (arrayToSort.hasOwnProperty(key))
            {
                keysArray[n++] = key;
            }
        }
        
        // Tri croissant
        keysArray = keysArray.sort();
        n         = keysArray.length;
        for (const key2 of keysArray)
        {
            sortedArray[key2] = arrayToSort[key2];
        }
        
        return sortedArray;
    }

    /**
     * Conversion d'un objet en tableau
     *
     * @author Fabien Bellanger
     * @param  {any} object
     * @return {any[]}
     */
    public objectToArray(object: any): any[]
    {
        return Object.keys(object).map((k: any) => object[k]);
    }
    
    /**
     * Conversion d'un objet en tableau
     *
     * @author Fabien Bellanger
     * @param  {any} object
     * @return {any}
     */
    public cloneObject(object: any): any
    {
        return JSON.parse(JSON.stringify(object));
    }
}
