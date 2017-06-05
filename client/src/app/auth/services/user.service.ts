import { Injectable } from '@angular/core';

import { StorageService } from '../../shared';
import { User } from '../../models';

@Injectable()

export class UserService
{
	public user: User;

    /**
     * Constructeur
     *
     * @author Fabien Bellanger
	 * @param {StorageService} storageService
     */
    constructor(private storageService: StorageService)
    {
		this.user = this.storageService.get('session', 'user', null);
    }

	/**
	 * Initialisation
	 * 
	 * @author Fabien Bellanger
	 * @param {User} user Utilisateur
	 */
	public init(user: User): void
	{
		this.user = user;

		// Enregistrement en session
		// -------------------------
		this.storageService.set('session', 'user', user);
	}

    /**
     * Retourne le nom complet
     * 
     * @author Fabien Bellanger
     * @return {string} Nom complet
     */
    public getFullname(): string
    {
        //return (this.user !== null) ? this.user.firstname + ' ' + this.user.lastname : '';
        return (this.user !== null) ? this.user.getFullname() : '';
    }

    /**
     * Retourne l'URL Gravatar'
     * 
     * @author Fabien Bellanger
     * @return {string} URL Gravatar
     */
    public getGravatarUrl(): string
    {
        return (this.user !== null)
            ? this.user.getGravatarUrl()
            : '';
    }
}
