<?php

    namespace App\Repositories;

    use DB;

    class TeamRepository
    {
        /**
         * Récupération l'ID des membres d'une équipe à partir de l'ID d'un sprint
         *
         * @author Fabien Bellanger
		 * @param  int $sprintId ID de l'équipe 
         * @return false|array
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

        /**
         * Récupération des équipes
         * 
         * @author Fabien Bellanger
         * @return false|array
         */
        public static function getAllTeams(): ?array
        {
            $query = '
                SELECT team.id, team.name, GROUP_CONCAT(team_member.user_id SEPARATOR ",") AS members
                FROM team INNER JOIN team_member ON team.id=team_member.team_id
                GROUP BY team.id';
            
            $results = DB::select($query);
            $teams   = [];
            if ($results)
            {
                foreach ($results as $index => $line)
                {
                    $teams[$index]['id']      = $line->id;
                    $teams[$index]['name']    = $line->name;
                    $teams[$index]['members'] = explode(',', $line->members);
                }
            }

            return $teams;
        }
    }
