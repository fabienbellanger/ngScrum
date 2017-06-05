import { Md5 } from 'ts-md5/dist/md5';

/**
 * User class
 *
 * @author Fabien Bellanger
 */
export class User
{
    /**
     * Constructeur
     *
     * @author Fabien Bellanger
     * @param {number}   id
     * @param {string}   lastname
     * @param {string}   firstname
     * @param {string} 	 email
     * @param {number}   groupId
     */
    constructor(public id: number,
                public lastname: string,
                public firstname: string,
                public email: string,
                public groupId: number)
    {
    }

    /**
     * Retourne le nom complet de l'utilisateur
     * 
     * @author Fabien Bellanger
     * @return {string} Nom complet de l'utilisateur
     */
    public getFullname(): string
    {
        let fullname: string = '';

        if (typeof this.firstname === 'string')
        {
            fullname += this.firstname + ' ';
        }
        if (typeof this.lastname === 'string')
        {
            fullname += this.lastname;
        }

        return fullname;
    }

    /**
     * Retourne l'URL Gravatar
     * 
     * @author Fabien Bellanger
     * @param {number} size Taille en px (default 32)
     * @return {string} URL Gravatar
     */
    public getGravatarUrl(size: number = 32): string
    {
        let url: string = '';

        if (this.email !== null && this.email !== '' && this.email !== undefined)
        {
            let md5: Md5 = new Md5();

            url = 'https://www.gravatar.com/avatar/' + Md5.hashStr(this.email) + '?s=' + size;
        }

        return url;
    }
}
