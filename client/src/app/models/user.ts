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
}
