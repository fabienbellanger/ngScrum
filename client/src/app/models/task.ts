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
     * @param {number}   initialDuration
     * @param {number}   remainingDuration
     * @param {boolean}  addedAfter
     * @param {number}   userId
     * @param {string}   createdDate
     * @param {string}   deliveredAt
     * @param {list}     any[]
     */
    constructor(public id: number,
                public name: string,
                public description: string,
                public initialDuration: number,
                public workedDuration: number = 0,
                public remainingDuration: number,
                public addedAfter: boolean,
                public userId: number,
                public createdDate: string,
                public deliveredAt: string,
                public list: any[])
    {
    }
}
