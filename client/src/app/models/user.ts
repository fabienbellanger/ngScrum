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
     * @param {Number}   id
     * @param {String}   lastname
     * @param {String}   firstname
     * @param {String} 	 email
     * @param {Number}   groupId
     */
    constructor(public id: number,
                public lastname: string,
                public firstname: string,
                public email: string,
                public groupId: number)
    {
    }
}
