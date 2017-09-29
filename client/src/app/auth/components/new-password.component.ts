import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

import { TranslateService } from '@ngx-translate/core';

import { ApiAuthService } from '../../api/services/api-auth.service';

@Component({
    selector:    'sa-auth-new-password',
    templateUrl: './new-password.component.html',
})

/**
 * Composant gérant le changement de mot de passe
 *
 * @author Fabien Bellanger
 */
export class NewPasswordComponent implements OnInit
{
    public formGroup: FormGroup;
    public token: string;

    /**
     * Constructeur
     *
     * @author Fabien Bellanger
     * @param {ApiAuthService}      apiAuthService
     * @param {ActivatedRoute}      route
     * @param {Router}              router
     * @param {MatSnackBar}         snackBar
     * @param {TranslateService}    translateService
     */
    constructor(private apiAuthService: ApiAuthService,
                private route: ActivatedRoute,
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
        this.token = this.route.snapshot.params['token'];

        // FormControls
        // ------------
        // TODO: Regarder : https://scotch.io/tutorials/how-to-implement-a-custom-validator-directive-confirm-password-in-angular-2
        this.formGroup = new FormGroup({
            password:        new FormControl('', [
                Validators.required,
                Validators.minLength(4),
            ]),
            passwordConfirm: new FormControl('', [
                Validators.required,
                Validators.minLength(4),
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
        this.apiAuthService.newPassword(this.token, this.formGroup.get('password').value)
            .then((response: any) =>
            {
                this.translateService.get(['new.password.success', 'success'])
                    .subscribe((translationObject: Object) =>
                    {
                        this.snackBar.open(
                            translationObject['new.password.success'],
                            translationObject['success'],
                            {
                                duration: 4000,
                            });
                    });
                
                // Redirection
                // -----------
                this.router.navigateByUrl('/login');
            })
            .catch((errorResponse: any) =>
            {
                const strBody: any = errorResponse.text();
                const body: any = (typeof strBody === 'string')
                    ? JSON.parse(strBody)
                    : null;
                const errorMessage: string = (body.hasOwnProperty('message'))
                    ? body.message
                    : 'error.occured';

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
            });
    }
}
