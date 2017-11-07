import { Component } from '@angular/core';

@Component({
    selector: 'sa-loading',
    template: `
        <div class="loading">
            <div>
                <mat-progress-spinner mode="indeterminate" [diameter]="50" [strokeWidth]="4">
                </mat-progress-spinner>
            </div>
            <h2 class="primary-color">{{ 'loading' | translate }}...</h2>
        </div>
    `,
    styles: [
        '.loading {display: flex; flex-direction: row;  align-items: center; margin: 0px 0px 0px 0px; height: 150px}',
        'h2 {margin: 20px}',
    ],
})

export class LoadingComponent
{
}
