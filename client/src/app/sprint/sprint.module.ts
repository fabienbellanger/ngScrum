import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { SharedModule, HttpService } from '../shared';
import { LayoutModule } from '../layout';

import { SprintComponent } from './components/sprint.component';
import { SprintListComponent } from './components/sprint-list.component';
import { SprintInfoComponent } from './components/info/sprint-info.component';
import { SprintService } from './services/sprint.service';

export { SprintService } from './services/sprint.service';

@NgModule({
    imports:      [
        CommonModule,
        HttpModule,
        RouterModule,
        SharedModule,
        LayoutModule,
    ],
    declarations: [
		SprintListComponent,
        SprintInfoComponent,
        SprintComponent,
    ],
    providers:    [
		HttpService,
        SprintService,
    ],
    exports:      [
		SprintListComponent,
        SprintInfoComponent,
        SprintComponent,
    ],
})

export class SprintModule
{
}
