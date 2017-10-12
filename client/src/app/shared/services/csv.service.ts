import { Injectable } from '@angular/core';

/**
 * Service pour exporter en CSV
 *
 * @author Fabien Bellanger
 */
@Injectable()
export class CsvService
{
    /**
     * Export en CSV
     *
     * @author Fabien Bellanger
     * @param {string[]} headers  Headers
     * @param {any[]}    data     Données
     * @param {string}   basename Nom du fichier
     */
    public exportToCSV(headers: string[], data: any[], basename: string): void
    {
        if (data !== null && data.length > 0)
        {
            const columnDelimiter: string = ';';
            const lineDelimiter:   string = '\n';
            const dataArray:       any[]  = [];
            const filename:        string = basename + '.csv';
            let dataString:        string;
            let headersString:     string;
            let csv:               string;

            // 1. Préparation des données
            // --------------------------

            // 1.1. Entêtes
            // ------------
            headersString = headers.map((element: any) => '"' + element + '"').join(columnDelimiter);

            // 1.2. Données
            // ------------
            for (const line of data)
            {
                // On entoure de guillemets double, on ajoute au tableau et on "stringify"
                // -----------------------------------------------------------------------
                dataArray.push(line.map((element: any) => '"' + element + '"').join(columnDelimiter));
            }
            dataString = dataArray.join(lineDelimiter);

            // 1.3. CSV
            // --------
            csv = headersString + lineDelimiter + dataString;

            // 2. Création du fichier
            // ----------------------
            const blob: Blob = new Blob([csv], {type: 'text/csv;charset=utf-8;'});

            if (navigator.msSaveBlob)
            {
                // IE 10+
                navigator.msSaveBlob(blob, filename);
            }
            else
            {
                const link: any = document.createElement('a');

                if (link.download !== undefined)
                {
                    // Browsers that support HTML5 download attribute
                    const url: string = URL.createObjectURL(blob);

                    link.setAttribute('href', url);
                    link.setAttribute('download', filename);
                    link.style.visibility = 'hidden';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                }
            }
        }
    }
}
