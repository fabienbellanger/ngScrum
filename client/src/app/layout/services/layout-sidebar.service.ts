import { Injectable } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';

/**
 * Service gérant la sidebar
 *
 * @author Fabien Bellanger
 */
@Injectable()
export class LayoutSidebarService
{
    public state: string;
    public items: any[] = [];

    /**
     * Constructeur
     *
     * @author Fabien Bellanger
     * @param {TranslateService} translateService
     */
    constructor(private translateService: TranslateService)
    {
        this.state = '';

        this.translateService.get([
            'sprints.list',
            'new.sprint.sidebar',
        ]).subscribe((transltationObject: Object) =>
        {
            this.items = [
                {
                    'label':      transltationObject['sprints.list'],
                    'route':      ['/sprints'],
                    'routeExact': true,
                    'picto':      'list',
                },
                {
                    'label':      transltationObject['new.sprint.sidebar'],
                    'route':      ['/sprints/new'],
                    'routeExact': true,
                    'picto':      'add',
                }
            ];
        });
    }

    /**
     * Toggle
     * 
     * @author Fabien Bellanger
     */
    public toogle(): void
    {
        this.state = (this.state === 'open') ? 'close' : 'open';
    }

    /**
     * Referme la sidebar en mode mobile
     *
     * @author Fabien Bellanger
     */
    public mobileClose(): void
    {
        if (window.innerWidth <= 640)
        {
            this.state = 'close';
        }
    }
}
