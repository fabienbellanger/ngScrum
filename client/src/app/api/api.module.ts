import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { SharedModule, HttpService } from '../shared';
import { ApiAuthService } from './services/api-auth.service';

@NgModule({
    imports:      [
        CommonModule,
        HttpModule,
        RouterModule,
        SharedModule,
    ],
    declarations: [
    ],
    providers:    [
		HttpService,
        ApiAuthService,
    ],
    exports:      [
    ],
})

export class ApiModule
{
}
