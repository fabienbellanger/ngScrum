<?php

    namespace App\Repositories;

    use DB;
    use TZ;
    use App\Repositories\UserRepository;

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
                SELECT
                    team.id,
                    team.name,
                    GROUP_CONCAT(team_member.user_id SEPARATOR ",") AS members,
                    team.deleted_at
                FROM team INNER JOIN team_member ON team.id=team_member.team_id
                WHERE team.deleted_at IS NULL
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
                    $teams[$index]['deleted'] = (!!$line->deleted_at);
                }
            }

            return $teams;
        }

        /**
         * L'équipe a t-elle déjà travaillée dans un sprint ?
         * 
         * @author Fabien Bellanger
         * @param int $teamId ID de l'équipe
         * @return bool
         */
        private static function isTeamInSprints(int $teamId): bool
        {
            $isInSprint = true;

            $query   = 'SELECT COUNT(sprint.team_id) AS nb FROM sprint WHERE sprint.team_id = :teamId';
            $results = DB::select($query, ['teamId' => $teamId]);
            
            if ($results && count($results) == 1)
            {
                $isInSprint = ($results[0]->nb > 0);
            }

            return $isInSprint;
        }

        /**
         * Suppression d'une équipe
         * 
         * @author Fabien Bellanger
         * @param int $teamId ID de l'équipe
         * @return array
         */
        public static function deleteTeam(int $teamId): array
        {
            $teamId = intval($teamId);

            if ($teamId == 0)
            {
                return [
                    'code'    => 404,
                    'message' => 'No team found',
                ];
            }

            // Recherche si l'équipe est associée à un sprint
            // ----------------------------------------------
            $isTeamInSprint = self::isTeamInSprints($teamId);
            if ($isTeamInSprint)
            {
                // On supprime logiquement l'équipe
                // --------------------------------
                $timezone = UserRepository::getTimezone();
                $deleteAt = TZ::getUTCDatetime2($timezone, date('Y-m-d H:i:s'), 'Y-m-d H:i:s');

                DB::table('team')
                    ->where('id', $teamId)
                    ->update(['deleted_at' => $deleteAt]);
            }
            else
            {
                // On supprime physiquement l'équipe
                // ---------------------------------
                DB::table('team')
                    ->where('id', $teamId)
                    ->delete();
            }

            return [
                'code'    => 200,
                'message' => 'Delete team success',
            ];
        }

        /**
         * Information pour créer ou modifier une équipe
         * 
         * @author Fabien Bellanger
         * @param int $teamId ID de l'équipe
         * @return array
         */
        public static function getTeamEdit(int $teamId): array
        {
            $teamId = intval($teamId);
            $team   = [];

            // Récupération de l'équipe dans le cas d'une édition
            // --------------------------------------------------
            if ($teamId != 0)
            {
                $query = '
                    SELECT
                        team.name, team.owner_id, team_member.user_id
                    FROM team LEFT JOIN team_member ON team.id = team_member.team_id
                    WHERE team.id = :teamId';
                $results = DB::select($query, ['teamId' => $teamId]);
                if ($results)
                {
                    foreach ($results as $line)
                    {
                        if (!array_key_exists('name', $team))
                        {
                            $team['name']    = $line->name;
                            $team['ownerId'] = $line->owner_id;
                            $team['members'] = [];
                        }
                        $team['members'][] = $line->user_id;
                    }
                }
            }

            // Récupération des utilisateurs
            // -----------------------------
            $users = UserRepository::getAllUsers();

            return [
                'code'    => 200,
                'message' => 'Success',
                'data'    => [
                    'team'  => $team,
                    'users' => $users,
                ]
            ];
        }

        /**
         * Suppression de tous les membres d'une équipe
         * 
         * @author Fabien Bellanger
         * @param int $teamId ID de l'équipe
         */
        private static function deleteAllMembersOfTeam(int $teamId): void
        {
            DB::table('team_member')
                ->where('team_id', $teamId)
                ->delete();
        }
        
        /**
         * Création / modification d'une équipe
         * 
         * @author Fabien Bellanger
         * @param int   $teamId ID de l'équipe
         * @param array $data   Données à enregistrer
         * @return array
         */
        public static function editTeam(int $teamId, array $data): array
        {
            $teamId    = intval($teamId);
            $timezone  = UserRepository::getTimezone();
            $now       = TZ::getUTCDatetime2($timezone, date('Y-m-d H:i:s'), 'Y-m-d H:i:s');

            try
            {
                DB::transaction(function() use (&$teamId, $data, $now) {
                    // 1. Création / Modification de la table team
                    // -------------------------------------------
                    $teamData = [
                        'name'       => $data['name'],
                        'owner_id'   => $data['ownerId'],
                        'updated_at' => $now,
                    ];
                    if ($teamId == 0)
                    {
                        // Création
                        // --------
                        $teamData['created_at'] = $now;

                        $teamId = DB::table('team')->insertGetId($teamData);
                    }
                    else
                    {
                        // Modification
                        // ------------
                        DB::table('team')
                            ->where('id', $teamId)
                            ->update($teamData);
                    }

                    // 2. Suppression de tous les membres
                    // ----------------------------------
                    self::deleteAllMembersOfTeam($teamId);
                    
                    // 3. Ajout des membres
                    // --------------------
                    $teamMemberData = [];
                    $teamMemberItem = ['team_id' => $teamId, 'user_id' => 0];
                    foreach ($data['members'] as $userId)
                    {
                        $teamMemberItem['user_id'] = $userId;
        
                        $teamMemberData[] = $teamMemberItem;
                    }
                    DB::table('team_member')->insert($teamMemberData);
                });
            }
            catch (Exception $exception)
            {
                return [
                    'code'    => 500,
                    'message' => 'Internal error',
                ];
            }

            return [
                'code' => 200,
                'data' => $teamId,
            ];
        }
    }
