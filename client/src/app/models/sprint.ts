import { Task } from './task';
import { User } from './user';

/**
 * Sprint class
 *
 * @author Fabien Bellanger
 */
export class Sprint
{
    /**
     * Constructeur
     *
     * @author Fabien Bellanger
     * @param {number}   id
     * @param {string}   name
     * @param {string}   createdAt
     * @param {string}   updatedAt
     * @param {string}   finishedAt
     * @param {Task[]}   tasks
     * @param {User[]}   users
     */
    constructor(public id: number,
                public name: string,
                public createdAt: string,
                public updatedAt: string,
                public finishedAt: string,
                public tasks: Task[],
                public users: User[])
    {
    }
}
