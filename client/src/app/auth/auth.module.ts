import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared';

import { AuthService } from './services/auth.service';
import { AuthGuardService } from './services/auth-guard.service';
import { UserService } from './services/user.service';

import { LoginComponent } from './components/login.component';
import { LogoutComponent } from './components/logout.component';
import { ForgottenPasswordComponent } from './components/forgotten-password.component';

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
        LogoutComponent,
        ForgottenPasswordComponent,
    ],
    providers:    [
        AuthService,
        AuthGuardService,
        UserService,
    ],
    exports:      [
    ],
})

export class AuthModule
{
}
