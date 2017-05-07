import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared';

import { AuthService } from './auth.service';

import { LoginComponent } from './components/login.component';

@NgModule({
    imports:      [
        CommonModule,
        HttpModule,
        RouterModule,
		FormsModule,
		SharedModule,
    ],
    declarations: [
		LoginComponent,
    ],
    providers:    [
		AuthService,
    ],
    exports:      [
		LoginComponent,
    ],
})

export class AuthModule
{
}
