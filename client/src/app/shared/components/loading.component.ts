import { Component } from '@angular/core';

@Component({
    selector: 'sa-loading',
    template: `
        <div class="loading">
            <div>
                <mat-progress-spinner
                    mode="indeterminate"
                    value="100"
                    style="height: 50px; width: 50px">
                </mat-progress-spinner>
            </div>
            <h2 class="primary-color">{{ 'loading' | translate }}...</h2>
        </div>
    `,
    styles: [
        '.loading {display: flex; flex-direction: row;  align-items: center; margin: 20px 0px 0px 20px}',
        'h2 {margin: 20px}',
    ],
})

export class LoadingComponent
{
}
