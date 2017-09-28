import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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
    public formGroup: FormGroup;

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
        this.formGroup = new FormGroup({
            email:      new FormControl('', [
                Validators.required,
                Validators.pattern(EMAIL_REGEX),
            ]),
            password:   new FormControl('', [
                Validators.required,
                Validators.minLength(4),
            ]),
        });

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
        this.authService.login(this.formGroup.get('email').value, this.formGroup.get('password').value)
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
