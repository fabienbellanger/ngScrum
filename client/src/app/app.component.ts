/* tslint:disable:no-unused-variable */

import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'sa-app',
    template: `
        <ng2-slim-loading-bar [color]="'#3F51B5'" [height]="'2px'"></ng2-slim-loading-bar>
        <router-outlet></router-outlet>`,
})

/**
 * Main component
 *
 * @author Fabien Bellanger
 */
export class AppComponent
{
    /**
     * Constructeur
     *
     * @author Fabien Bellanger
     * @param {TranslateService} translateService
     */
    constructor(private translateService: TranslateService)
    {
        // Traduction
        // ----------
        this.translateService.setDefaultLang('fr');
        this.translateService.use('fr');
    }
}
