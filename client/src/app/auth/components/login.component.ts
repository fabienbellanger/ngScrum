import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';

import { AuthService } from '../services/auth.service';

@Component({
    selector:    'sa-auth-login',
    templateUrl: './login.component.html',
})

/**
 * Composant gérant l'authentification - Page de login
 *
 * @author Fabien Bellanger
 */
export class LoginComponent implements OnInit
{
    public errorMessage: string;
    public currentYear: string;
    public emailFormControl: FormControl;
    public passwordFormControl: FormControl;

    /**
     * Constructeur
     *
     * @author Fabien Bellanger
     * @param {AuthService} authService
     * @param {Router}      router
     */
    constructor(private authService: AuthService,
                private router: Router)
    {
    }

    /**
     * Initialisation du composant
     *
     * @author Fabien Bellanger
     */
    public ngOnInit(): void
    {
        const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

        this.errorMessage = '';
        this.currentYear  = '';

        // FormControls
        // ------------
        this.emailFormControl    = new FormControl('', [
            Validators.required,
            Validators.pattern(EMAIL_REGEX),
        ]);
        this.passwordFormControl = new FormControl('', [
            Validators.required,
            Validators.minLength(4),
        ]);

        // L'utilisateur est-il déjà connecté ?
        // ------------------------------------
        this.authService.checkToken();
    }

    /**
     * Soumission du formulaire d'authentification
     *
     * @author Fabien Bellanger
     */
    public submitForm(): void
    {
        this.authService.login(this.emailFormControl.value, this.passwordFormControl.value)
            .then(() =>
            {
                this.router.navigate(['/']);
            })
            .catch((error: string) =>
            {
                console.error(error);
            });
    }
}
