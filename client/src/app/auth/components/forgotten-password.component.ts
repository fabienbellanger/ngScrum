import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../services/auth.service';

@Component({
    selector:    'sa-auth-forgotten-password',
    templateUrl: './forgotten-password.component.html',
})

/**
 * Composant gérant le changement de mot de passe
 *
 * @author Fabien Bellanger
 */
export class ForgottenPasswordComponent implements OnInit
{
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
        
        // FormControls
        // ------------
        this.formGroup = new FormGroup({
            email:      new FormControl('', [
                Validators.required,
                Validators.pattern(EMAIL_REGEX),
            ]),
        });
    }

    /**
     * Soumission du formulaire
     *
     * @author Fabien Bellanger
     */
    public submitForm(): void
    {
        console.log(this.formGroup.get('email').value);
    }
}
