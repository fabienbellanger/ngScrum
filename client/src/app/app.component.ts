/* tslint:disable:no-unused-variable */

import { Component } from '@angular/core';
import { TranslateService } from 'ng2-translate/ng2-translate';
import { ToastyService, ToastyConfig } from 'ng2-toasty';

@Component({
    selector: 'sa-app',
    template: `
        <ng2-slim-loading-bar [color]="'#eea236'" [height]="'2px'"></ng2-slim-loading-bar>
        <router-outlet>FFFF</router-outlet>
        <ng2-toasty></ng2-toasty>`,
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
     * @param (TranslateService)    translateService
     * @param (ToastyService)       toastyService
     * @param (ToastyConfig)        toastyConfig
     */
    constructor(private translateService: TranslateService,
                private toastyService: ToastyService,
                private toastyConfig: ToastyConfig)
    {
        // Traduction
        // ----------
        this.translateService.setDefaultLang('fr');
        this.translateService.use('fr');

        // Toasty
        // ------
        this.toastyConfig.theme     = 'material';
        this.toastyConfig.position  = 'bottom-right';
        this.toastyConfig.timeout   = 5000;
        this.toastyConfig.showClose = true;
    }
}
