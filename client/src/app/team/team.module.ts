import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { HttpService, SharedModule } from '../shared';
import { LayoutModule } from '../layout';

import { TeamComponent } from './components/team.component';
import { TeamListComponent } from './components/team-list.component';
import { TeamEditComponent } from './components/team-edit.component';
import { TeamDeleteDialogComponent } from './components/dialogs/team-delete-dialog.component';

@NgModule({
    imports:         [
        CommonModule,
        HttpModule,
        RouterModule,
        SharedModule,
        LayoutModule,
    ],
    declarations:    [
        TeamComponent,
        TeamListComponent,
        TeamEditComponent,
        TeamDeleteDialogComponent,
    ],
    providers:       [
        HttpService,
    ],
    entryComponents: [
        TeamDeleteDialogComponent,
    ],
    exports:         [
    ],
})

export class TeamModule
{
}
