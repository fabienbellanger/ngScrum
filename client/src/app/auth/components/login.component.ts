import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { ToastyService } from 'ng2-toasty';

import { AuthService } from '../auth.service';

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
	private email: string;
	private password: string;
	private errorMessage: string;
    private currentYear: string;

    @ViewChild('inputEmail') private inputEmail: any;

    /**
     * Constructeur
     *
     * @author Fabien Bellanger
     * @param {AuthService} authService
     */
    constructor(private authService: AuthService,
                private toastyService: ToastyService)
    {
    }

    /**
     * Initialisation du composant
     *
     * @author Fabien Bellanger
     */
    public ngOnInit(): void
    {
        this.email  	  = '';
        this.password  	  = '';
		this.errorMessage = '';
        this.currentYear  = '';
    }

    /**
     * Appelé quand la vue du composant est initialisée
     *
     * @author Fabien Bellanger
     */
    public ngAfterViewInit(): void
    {
        // Focus
        this.inputEmail.nativeElement.focus();
    }

    /**
     * Soumission du formulaire d'authentification
     * 
     * @author Fabien Bellanger
     */
	private submitForm(): void
	{
        this.authService.login(this.email, this.password);
	}
}
