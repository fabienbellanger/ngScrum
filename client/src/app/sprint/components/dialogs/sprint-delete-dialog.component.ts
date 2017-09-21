import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'sa-sprint-delete-dialog',
    template: `
		<h1 md-dialog-title>Warning!</h1>
		<div md-dialog-content>
			<p>Do you really want to delete this sprint?</p>
		</div>
		<div md-dialog-actions>
			<button md-button [md-dialog-close]="data.confirm" tabindex="2">Yes</button>
			<button md-button (click)="onNoClick()" tabindex="-1">No</button>
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
                @Inject(MD_DIALOG_DATA) public data: any)
    {}

    public onNoClick(): void
    {
        this.dialogRef.close();
    }
}
