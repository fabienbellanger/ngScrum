import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

import { TranslateService } from '@ngx-translate/core';

import { ApiAuthService } from '../../api/services/api-auth.service';

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
    public formSubmitted: boolean;

    /**
     * Constructeur
     *
     * @author Fabien Bellanger
     * @param {ApiAuthService}      apiAuthService
     * @param {Router}              router
     * @param {MatSnackBar}         snackBar
     * @param {TranslateService}    translateService
     */
    constructor(private apiAuthService: ApiAuthService,
                private router: Router,
                private snackBar: MatSnackBar,
                private translateService: TranslateService)
    {
    }

    /**
     * Initialisation du composant
     *
     * @author Fabien Bellanger
     */
    public ngOnInit(): void
    {
        // Initialisation
        // --------------
        this.formSubmitted = false;

        // FormControls
        // ------------
        const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        
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
        if (!this.formSubmitted)
        {
            // Jeton pour n'avoir qu'une soumission
            // ------------------------------------
            this.formSubmitted = true;

            this.apiAuthService.forgottenPassword(this.formGroup.get('email').value)
                .then((response: any) =>
                {
                    this.translateService.get(['forgotten.password.success', 'success'])
                        .subscribe((translationObject: Object) =>
                        {
                            this.snackBar.open(
                                translationObject['forgotten.password.success'],
                                translationObject['success'],
                                {
                                    duration: 4000,
                                });
                        });
                        
                    // Jeton pour n'avoir qu'une soumission
                    // ------------------------------------
                    this.formSubmitted = false;
                        
                    this.router.navigateByUrl('/login');
                })
                .catch((errorResponse: any) =>
                {
                    const body: any = (typeof errorResponse.text() === 'string')
                        ? JSON.parse(errorResponse.text())
                        : null;
                    const errorMessage: string = (body.hasOwnProperty('message'))
                        ? body.message
                        : '';

                    this.translateService.get([errorMessage, 'error'])
                        .subscribe((translationObject: Object) =>
                        {
                            this.snackBar.open(
                                translationObject[errorMessage],
                                translationObject['error'],
                                {
                                    duration: 3000,
                                });
                        });

                    this.formGroup.get('email').setValue('');
                    
                    // Jeton pour n'avoir qu'une soumission
                    // ------------------------------------
                    this.formSubmitted = false;
                });
        }
    }
}
