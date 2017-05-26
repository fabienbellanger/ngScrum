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
         * @param int    $id     ID de l'utilisateur
         * @param string $filter Filtre {'all', 'finished', 'inProgress'}
         * @return array
         */
        public static function getSprints($id, $filter = 'all'): ?array
        {
            // Liste des sprints
            // -----------------
            $sprints = SprintRepository::getSprintsOfUser($id, $filter);

            if ($sprints)
            {
                // Informations sur les tâches
                // ---------------------------
                $sprintsTasksWorked = SprintRepository::getSprintsWorkedDurationOfUser($id, $filter);

                // Construction du tableau
                // -----------------------
                foreach ($sprints as $sprintId => $sprintData)
                {
                    if (array_key_exists($sprintId, $sprintsTasksWorked))
                    {
                        $sprints[$sprintId] = array_merge($sprintData, $sprintsTasksWorked[$sprintId]);
                    }
                }
            }

            // Objet => tableau
            $sprints = array_values($sprints);

            return [
                'code'    => 200,
                'message' => 'Success',
                'data'    => $sprints,
            ];
        }
    }