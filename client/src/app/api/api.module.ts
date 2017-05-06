import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { HttpService } from '../shared';

@NgModule({
    imports:      [
        CommonModule,
        HttpModule,
        RouterModule,
    ],
    declarations: [
    ],
    providers:    [
		HttpService,
    ],
    exports:      [
		HttpService,
    ],
})

export class ApiModule
{
}
