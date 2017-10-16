<?php

    namespace App\Repositories;

    use Auth;
    use DB;

    class TeamRepository
    {
        /**
         * Récupération l'ID des membres d'une équipe à partir de l'ID d'un sprint
         *
         * @author Fabien Bellanger
		 * @param  int $sprintId ID de l'équipe 
         * @return false|Array
         */
        public static function getUsersIdFromSprint($sprintId): ?array
        {
            if (!$sprintId)
			{
				return false;
			}

			return DB::select('
                SELECT DISTINCT users.id
                FROM users
                    INNER JOIN team_member ON team_member.user_id=users.id
					INNER JOIN sprint ON sprint.id = :id AND team_member.team_id=sprint.team_id
				', ['id' => $sprintId]);
        }
    }