/**
 * Task class
 *
 * @author Fabien Bellanger
 */
export class Task
{
    /**
     * Constructeur
     *
     * @author Fabien Bellanger
     * @param {number}   id
     * @param {string}   name
     * @param {string}   description
     * @param {string} 	 date
     * @param {number}   duration
     * @param {list}     any[]
     */
    constructor(public id: number,
                public name: string,
                public description: string,
                public date: string,
                public duration: number,
                public list: any[])
    {
    }
}
