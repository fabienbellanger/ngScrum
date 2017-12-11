/* tslint:disable:no-unused-variable */

import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'sa-app',
    template: `
        <ng-progress [color]="'#3F51B5'" [spinner]="false"></ng-progress>
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
