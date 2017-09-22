import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'sa-sprint-delete-dialog',
    template: `
        <h1 md-dialog-title> {{ 'warning' | translate }}</h1>
		<div md-dialog-content>
			<p>{{ 'want.to.delete.sprint' | translate }}</p>
		</div>
		<div md-dialog-actions>
			<button md-button color="primary" [md-dialog-close]="data.confirm" tabindex="2">{{ 'yes' | translate }}</button>
			<button md-button (click)="onNoClick()" tabindex="-1">{{ 'no' | translate }}</button>
		</div>
	`,
})

export class SprintDeleteDialogComponent
{
    /**
     * Constructeur
     *
     * @author Fabien Bellanger
     * @param {MdDialogRef<SprintDeleteDialogComponent>} dialogRef
     * @param {any}                                      data       Données transmises
     */
    constructor(private dialogRef: MdDialogRef<SprintDeleteDialogComponent>,
                @Inject(MD_DIALOG_DATA) private data: any)
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
