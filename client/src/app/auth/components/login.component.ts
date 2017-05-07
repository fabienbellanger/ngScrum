import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

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

    @ViewChild('inputEmail') private inputEmail: any;
    @ViewChild('inputPassword') private inputPassword: any;

    /**
     * Constructeur
     *
     * @author Fabien Bellanger
     */
    constructor()
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

	private onSubmit(): void
	{

	}
}
