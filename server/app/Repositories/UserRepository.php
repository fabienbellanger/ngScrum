<?php

    namespace App\Repositories;

    use Auth;
    use DB;

    class UserRepository
    {
        /**
         * Informations à fournir après l'authentification
         *
         * @author Fabien Bellanger
         * @return Array
         */
        public static function getInformationAfterAuthentication(): ?array
        {
            $user = Auth::User();

            if (!$user)
            {
                return null;
            }

            $data = [
                'id'        => $user->id,
                'lastname'  => $user->lastname,
                'firstname' => $user->firstname,
                'email'     => $user->email,
                'groupId'   => $user->group_id
            ];

            return $data;
        }

        /**
         * L'utilisateur est-il valide ?
         *
         * @author Fabien Bellanger
         * @param int $id ID de l'utilisateur
         * @return bool
         */
        private static function isUserValid($id): bool
        {
            $results = DB::select('
                SELECT COUNT(*) AS nbUsers
                FROM users
                WHERE id = :id', ['id' => $id]);

            if ($results && count($results) == 1)
            {
                return ($results[0]->nbUsers == 1);
            }
            else
            {
                return false;
            }
        }

        /**
         * Liste des équipes
         *
         * @author Fabien Bellanger
         * @param int $id ID de l'utilisateur
         * @return array
         */
        public static function getTeams($id): ?array
        {
            $result = [];

            // L'utilisateur est-il valide ?
            // -----------------------------
            $isUserValid = self::isUserValid($id);
            if (!$isUserValid)
            {
                return [
                    'code'    => 404,
                    'message' => 'User Not Found',
                ];
            }

            // Liste des équipes
            // -----------------
            $teams = DB::select('
                SELECT id, name, picture_url, owner_id
                FROM team
                    INNER JOIN team_member ON team_id=id
                WHERE user_id = :id', ['id' => $id]);

            return [
                'code'    => 200,
                'message' => 'Success',
                'data'    => $teams,
            ];
        }

        /**
         * Liste des sprints
         *
         * @author Fabien Bellanger
         * @param int $id ID de l'utilisateur
         * @param string $filter Filtre {'all', 'finished', 'inProgress'}
         * @return array
         */
        public static function getSprints($id, $filter = 'all'): ?array
        {
            $query = '
                SELECT
                    sprint.id AS sprintId,
                    sprint.name AS sprintName,
                    sprint.team_id AS teamId,
                    sprint.created_at AS sprintCreatedAt,
                    sprint.finished_at AS sprintFinishedAt,
                    task.id AS taskId,
                    task.name AS taskName,
                    task.description AS taskDescription,
                    task.user_id AS taskUserId,
                    task.initial_duration AS taskInitialDuration,
                    task.remaining_duration AS taskRemainingDuration,
                    task.created_at AS taskCreatedAt,
                    task.finished_at AS taskFinishedAt
                FROM sprint
                    INNER JOIN team ON team.id = sprint.team_id
                    INNER JOIN team_member ON team.id = team_member.team_id AND team_member.user_id = :userId
                    INNER JOIN task ON sprint.id = task.sprint_id
                ORDER BY sprint.created_at ASC
            ';

            $results = DB::select($query, ['userId' => $id]);
            if ($results)
            {
                // Mise en forme des données
                // -------------------------
                $sprints = [];
                foreach ($results as $line)
                {
                    $sprintId = $line->sprintId;
                    
                    if (!isset($sprints[$sprintId]))
                    {
                        $sprints[$sprintId]['id']         = $sprintId;
                        $sprints[$sprintId]['name']       = $line->sprintName;
                        $sprints[$sprintId]['teamId']     = $line->teamId;
                        $sprints[$sprintId]['createdAt']  = $line->sprintCreatedAt;
                        $sprints[$sprintId]['finishedAt'] = $line->sprintFinishedAt;
                        $sprints[$sprintId]['tasks']      = [];
                    }

                    // Tâches
                    $task['id']                    = $line->taskId;
                    $task['name']                  = $line->taskName;
                    $task['description']           = $line->taskDescription;
                    $task['userId']                = $line->taskUserId;
                    $task['initialDuration']       = $line->taskInitialDuration;
                    $task['remainingDuration']     = $line->taskRemainingDuration;
                    $task['createdAt']             = $line->taskCreatedAt;
                    $task['FinishedAt']            = $line->taskFinishedAt;
                    $sprints[$sprintId]['tasks'][] = $task;
                }

                // Objet => tableau
                $sprints = array_values($sprints);

                return [
                    'code'    => 200,
                    'message' => 'Success',
                    'data'    => $sprints,
                ];
            }
            else
            {
                return [
                    'code'    => 500,
                    'message' => 'Internal Error',
                ];
            }
        }
    }