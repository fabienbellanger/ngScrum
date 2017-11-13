import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'sa-sprint-delete-dialog',
    template: `
        <h1 mat-dialog-title> {{ 'warning' | translate }}</h1>
		<div mat-dialog-content>
			<p>{{ 'want.to.delete.team' | translate }}</p>
		</div>
		<div mat-dialog-actions>
			<button mat-button color="primary" [mat-dialog-close]="data.confirm" tabindex="2">{{ 'yes' | translate }}</button>
			<button mat-button (click)="onNoClick()" tabindex="-1">{{ 'no' | translate }}</button>
		</div>
	`,
})

export class TeamDeleteDialogComponent
{
    /**
     * Constructeur
     *
     * @author Fabien Bellanger
     * @param {MatDialogRef<TeamDeleteDialogComponent>} dialogRef
     * @param {any}                                     data       Données transmises
     */
    constructor(private dialogRef: MatDialogRef<TeamDeleteDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any)
    {}

    /**
     * Clique sur "Non"
     *
     * @author Fabien Bellanger
     */
    public onNoClick(): void
    {
        this.dialogRef.close();
    }
}
