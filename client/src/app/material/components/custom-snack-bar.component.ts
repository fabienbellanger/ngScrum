import { Component, ViewEncapsulation, Inject, ChangeDetectionStrategy } from '@angular/core';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material';

@Component({
    selector:            'custom-snack-bar',
    encapsulation:       ViewEncapsulation.None,
    preserveWhitespaces: false,
    changeDetection:     ChangeDetectionStrategy.OnPush,
    host:                {
        'class':           'mat-simple-snackbar',
    },
    template:            `
        {{ data.message }}
        
        <button class="mat-simple-snackbar-action"
                *ngIf="hasAction"
                (click)="action()">{{ data.action }}</button>
    `,
})

export class CustomSnackBarComponent
{
    public data: any = {
        message: '',
        action:  '',
    };

    /**
     * Constructeur
     * 
     * @author Fabien Bellanger
     * @param {MatSnackBarRef<CustomSnackBar>}  snackBarRef 
     * @param {any}                             data
     */
    constructor(public snackBarRef: MatSnackBarRef<CustomSnackBarComponent>,
                @Inject(MAT_SNACK_BAR_DATA) data: any)
    {
        this.data = data;
    }
    
    get hasAction(): boolean
    {
        return !!this.data.action;
    }

    /**
     * Action à exécuter
     * 
     * @author Fabien Bellanger
     */
    public action(): void
    {
        alert('coucou');
        this.snackBarRef.closeWithAction();
    }
}
