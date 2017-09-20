import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MD_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'sa-sprint-delete-dialog',
	template: `
	<h1 md-dialog-title>Hi!</h1>
	<div md-dialog-content>
	  <p>What's your favorite animal?</p>
	</div>
	<div md-dialog-actions>
	  <button md-button [md-dialog-close]="data.animal" tabindex="2">Ok</button>
	  <button md-button (click)="onNoClick()" tabindex="-1">No Thanks</button>
	</div>
	`,
})
export class SprintDeleteDialogComponent
{
    constructor(@Inject(MD_DIALOG_DATA) public data: any)
    {}
}
