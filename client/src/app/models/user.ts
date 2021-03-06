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
     * @param {number}   workedHoursPerDay
     * @param {aby[]}    teams
     */
    constructor(public id: number,
                public lastname: string,
                public firstname: string,
                public email: string,
                public groupId: number,
                public workedHoursPerDay: number,
                public teams: any[])
    {
    }
}
