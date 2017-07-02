<?php

    namespace App\Repositories;

    use DB;
    use Exception;

    class SprintRepository
    {
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
            $sprints = self::getSprintsOfUser($id, $filter);

            if ($sprints)
            {
                // Informations sur les tâches
                // ---------------------------
                $sprintsTasksWorked = self::getSprintsWorkedDurationOfUser($id, $filter);

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
            // ----------------
            $sprints = array_values($sprints);

            return [
                'code'    => 200,
                'message' => 'Success',
                'data'    => $sprints,
            ];
        }

        /**
         * Récupération d'une tâche
         *
         * @author Fabien Bellanger
         * @param int $sprintId ID du sprint
         * @param int $taskId   ID de la tâche (default 0)
         * @return stdClass
         */
        public static function getTask($sprintId, $taskId)
        {
            $taskId = intval($taskId);
            $query  = '
                SELECT *
                FROM task
                WHERE task.id = :taskId 
                    AND task.sprint_id = :sprintId';
            $tasks = DB::select($query, ['taskId' => $taskId, 'sprintId' => $sprintId]);
            if (!$tasks || count($tasks) != 1)
            {
                return null;
            }

            return $tasks[0];
        }

        /**
         * Liste des sprints
         *
         * @author Fabien Bellanger
         * @param int    $sprintId     ID du sprint
         * @return array
         */
        public static function isSprintValid($sprintId): ?bool
        {
            $query   = '
                SELECT sprint.id
                FROM sprint
                WHERE sprint.id = :sprintId';
            $results = DB::select($query, ['sprintId' => $sprintId]);
            if (!$results || count($results) != 1)
            {
                return false;
            }

            return true;
        }

        /**
         * Liste des sprints d'un utilisateur
         *
         * @author Fabien Bellanger
         * @param int    $userId ID de l'utilisateur
         * @param string $filter Filtre {'all', 'finished', 'inProgress'}
         * @return array
         */
        public static function getSprintsOfUser($userId, $filter): ?array
        {
            // Requête
            // -------
            $query = '
                SELECT
                    sprint.id AS sprintId,
                    sprint.name AS sprintName,
                    sprint.team_id AS teamId,
                    sprint.created_at AS sprintCreatedAt,
                    sprint.finished_at AS sprintFinishedAt,
                    SUM(task.initial_duration) AS initialDuration,
                    SUM(task.remaining_duration) AS remainingDuration
                FROM sprint
                    INNER JOIN team ON team.id = sprint.team_id
                    INNER JOIN team_member ON team.id = team_member.team_id AND team_member.user_id = :userId
                    INNER JOIN task ON sprint.id = task.sprint_id';
            if ($filter == 'inProgress')
            {
                $query .= ' WHERE sprint.finished_at IS NULL';
            }
            elseif ($filter == 'finished')
            {
                $query .= ' WHERE sprint.finished_at IS NOT NULL';
            }
            $query .= ' GROUP BY sprint.id ORDER BY sprint.created_at ASC';

            $results = DB::select($query, ['userId' => $userId]);

            // Traitement
            // ----------
            $sprints = [];
            if ($results)
            {
                // Mise en forme des données
                // -------------------------
                foreach ($results as $line)
                {
                    $sprintId = $line->sprintId;

                    if (!isset($sprints[$sprintId]))
                    {
                        $sprints[$sprintId]['id']                = $sprintId;
                        $sprints[$sprintId]['name']              = $line->sprintName;
                        $sprints[$sprintId]['teamId']            = $line->teamId;
                        $sprints[$sprintId]['createdAt']         = $line->sprintCreatedAt;
                        $sprints[$sprintId]['finishedAt']        = $line->sprintFinishedAt;
                        $sprints[$sprintId]['initialDuration']   = $line->initialDuration;
                        $sprints[$sprintId]['remainingDuration'] = $line->remainingDuration;
                        $sprints[$sprintId]['progressPercent']   = round((($line->initialDuration - $line->remainingDuration) / $line->initialDuration) * 100, 0);
                    }
                }
            }

            return $sprints;
        }

        /**
         * Informations sur les durées des sprints d'un utilisateur
         *
         * @author Fabien Bellanger
         * @param int    $userId ID de l'utilisateur
         * @param string $filter Filtre {'all', 'finished', 'inProgress'}
         * @return array
         */
        public static function getSprintsWorkedDurationOfUser($userId, $filter): ?array
        {
            // Requête
            // -------
            $query = '
                SELECT
                    sprint.id AS sprintId,
                    task.id AS taskId,
                    task.initial_duration AS initialDuration,
                    task.remaining_duration AS remainingDuration
                FROM sprint
                    INNER JOIN team ON team.id = sprint.team_id
                    INNER JOIN team_member ON team.id = team_member.team_id AND team_member.user_id = :userId
                    INNER JOIN task ON sprint.id = task.sprint_id
                    INNER JOIN task_user ON task.id = task_user.task_id';
            if ($filter == 'inProgress')
            {
                $query .= ' WHERE sprint.finished_at IS NULL';
            }
            elseif ($filter == 'finished')
            {
                $query .= ' WHERE sprint.finished_at IS NOT NULL';
            }
            $query .= ' GROUP BY task.id';

            $results = DB::select($query, ['userId' => $userId]);

            // Traitement
            // ----------
            $tasks = [];
            if ($results)
            {
                // Mise en forme des données
                // -------------------------
                foreach ($results as $line)
                {
                    $sprintId = $line->sprintId;
                    $taskId   = $line->taskId;

                    // Initialisation
                    // --------------
                    if (!isset($tasks[$sprintId]))
                    {
                        $tasks[$sprintId]['initialDuration']   = 0;
                        $tasks[$sprintId]['remainingDuration'] = 0;
                    }

                    // Calculs
                    // -------
                    $tasks[$sprintId]['initialDuration']   += $line->initialDuration;
                    $tasks[$sprintId]['remainingDuration'] += $line->remainingDuration;
                }
            }

            return $tasks;
        }

        /**
         * Information d'un sprint
         *
         * @author Fabien Bellanger
         * @param int $userId   ID de l'utilisateur
         * @param int $sprintId ID du sprint
         * @return array
         */
        public static function getSprintInfo($userId, $sprintId): ?array
        {
            $sprint = [];

            // 1. Récupération du sprint
            // -------------------------
            $query   = '
                SELECT sprint.name, sprint.created_at, sprint.updated_at, sprint.finished_at
                FROM sprint
                WHERE sprint.id = :sprintId';
            $results = DB::select($query, ['sprintId' => $sprintId]);
            if (!$results || count($results) != 1)
            {
                return [
                    'code'    => 404,
                    'message' => 'No sprint found',
                ];
            }

            $sprint['id']         = $sprintId;
            $sprint['name']       = $results[0]->name;
            $sprint['createdAt']  = $results[0]->created_at;
            $sprint['updatedAt']  = $results[0]->updated_at;
            $sprint['finishedAt'] = $results[0]->finished_at;

            // 2. Récupération des tâches
            // --------------------------
            $query   = '
                SELECT
                    task.id AS taskId,
                    task.name AS taskName,
                    task.description AS taskDescription,
                    task.initial_duration AS taskInitialDuration,
                    task.remaining_duration AS taskRemainingDuration,
                    task.user_id AS taskUserId,
                    task.added_after AS taskAddedAfter,
                    task_user.id AS taskPartId,
                    task_user.user_id AS taskPartUserId,
                    task_user.duration AS taskPartDuration,
                    task_user.worked_duration AS taskPartWorkedDuration,
                    task_user.date AS taskPartDate
                FROM task
                    LEFT JOIN task_user ON task_user.task_id = task.id
                WHERE task.sprint_id = :sprintId
                ORDER BY task.created_at ASC';
            $results = DB::select($query, ['sprintId' => $sprintId]);
            $tasks   = [];
            foreach ($results as $task)
            {
                $taskId     = $task->taskId;
                $taskPartId = $task->taskPartId;

                if (!array_key_exists($taskId, $tasks))
                {
                    $tasks[$taskId]['id']                = $taskId;
                    $tasks[$taskId]['name']              = $task->taskName;
                    $tasks[$taskId]['description']       = $task->taskDescription;
                    $tasks[$taskId]['initialDuration']   = floatval($task->taskInitialDuration);
                    $tasks[$taskId]['remainingDuration'] = floatval($task->taskRemainingDuration);
                    $tasks[$taskId]['userId']            = $task->taskUserId;
                    $tasks[$taskId]['addedAfter']        = $task->taskAddedAfter;
                    $tasks[$taskId]['list']              = [];
                }

                if ($taskPartId && !array_key_exists($taskPartId, $tasks[$taskId]['list']))
                {
                    $tasks[$taskId]['list'][$taskPartId]['id']             = $taskPartId;
                    $tasks[$taskId]['list'][$taskPartId]['userId']         = $task->taskPartUserId;
                    $tasks[$taskId]['list'][$taskPartId]['duration']       = floatval($task->taskPartDuration);
                    $tasks[$taskId]['list'][$taskPartId]['workedDuration'] = floatval($task->taskPartWorkedDuration);
                    $tasks[$taskId]['list'][$taskPartId]['date']           = $task->taskPartDate;
                }
            }

            // 3. Récupération des utilisateurs
            // --------------------------------
            $users = [];
            $query           = '
                SELECT DISTINCT 
                    users.id,
                    users.firstname,
                    users.lastname, 
                    users.email,
                    users.worked_hours_per_day,
                    users.group_id
                FROM task
                    INNER JOIN task_user ON task_user.task_id = task.id
                    INNER JOIN users ON users.id = task_user.user_id
                WHERE task.sprint_id = :sprintId';
            $results = DB::select($query, ['sprintId' => $sprintId]);
            if ($results && count($results) > 0)
            {
                foreach ($results as $user)
                {
                    if (!array_key_exists($user->id, $users))
                    {
                        $users[$user->id]['id']                = intval($user->id);
                        $users[$user->id]['firstname']         = $user->firstname;
                        $users[$user->id]['lastname']          = $user->lastname;
                        $users[$user->id]['email']             = $user->email;
                        $users[$user->id]['groupId']           = intval($user->group_id);
                        $users[$user->id]['workedHoursPerDay'] = intval($user->worked_hours_per_day);
                    }
                }
            }
            $sprint['users'] = $users;

            // 4. Objet => tableau
            // -------------------
            $tasks = array_values($tasks);
            foreach ($tasks as $index => $task)
            {
                $tasks[$index]['list'] = array_values($tasks[$index]['list']);
            }

            $sprint['tasks'] = $tasks;

            return [
                'code'    => 200,
                'message' => 'Success',
                'data'    => $sprint,
            ];
        }

        /**
         * Ajout / Modification d'une tâche
         *
         * @author Fabien Bellanger
         * @param int $userId   ID de l'utilisateur
         * @param int $sprintId ID du sprint
         * @param array $data   POST data
         * @param int $taskId   ID de la tâche (default 0)
         * @return array
         */
        public static function editTask($userId, $sprintId, $data, $taskId = 0): ?array
        {
            // 1. Vérification des données
            // ---------------------------
            if (!array_key_exists('name', $data) || !array_key_exists('duration', $data)
                || !array_key_exists('notPlanned', $data))
            {
                return [
                    'code'    => 500,
                    'message' => 'Bad data',
                ];
            }

            // 2. Sprint valide ?
            // ------------------
            if (!self::isSprintValid($userId, $sprintId))
            {
                return [
                    'code'    => 404,
                    'message' => 'No sprint found',
                ];
            }

            // 3. Traitement des données
            // -------------------------
            $data['applicationsIds'] = (!array_key_exists('applicationsIds', $data))
                ? []
                : $data['applicationsIds'];

            // 4. Enregistrement en base
            // -------------------------
            try
            {
                DB::transaction(function() use ($userId, $sprintId, $taskId, &$data)
                {
                    if ($taskId == 0)
                    {
                        // Création
                        // --------
                        self::addTask($userId, $sprintId, $data);
                    }
                    else
                    {
                        // Modification
                        // ------------
                        self::modifyTask($userId, $sprintId, $taskId, $data);
                    }
                });
            }
            catch(Exception $exception)
            {
                return [
                    'code'    => 500,
                    'message' => 'Internal error 1',
                ];
            }
            
            if (!isset($data['id']))
            {
                return [
                    'code'    => 500,
                    'message' => 'Internal error 2',
                ];
            }

            return [
                'code'    => 200,
                'message' => 'Success',
                'data'    => $data,
            ];
        }

        /**
         * Ajout d'une tâche
         *
         * @author Fabien Bellanger
         * @param int $userId   ID de l'utilisateur
         * @param int $sprintId ID du sprint
         * @param array $data   POST data (Référence)
         */
        static private function addTask($userId, $sprintId, &$data)
        {
            // Ajout dans la table task
            // ------------------------
            $taskData = [
                'user_id'            => $userId,
                'sprint_id'          => $sprintId,
                'name'               => $data['name'],
                'description'        => ($data['description']) ? $data['description'] : null,
                'initial_duration'   => floatval($data['duration']),
                'remaining_duration' => floatval($data['duration']),
                'added_after'        => intval($data['notPlanned']),
                'created_at'         => date('Y-m-d H:i:s'),
                'updated_at'         => date('Y-m-d H:i:s'),
            ];
            $taskId = DB::table('task')->insertGetId($taskData);

            // Ajout dans la table task_application
            // ------------------------------------
            $taskApplicationData = [];
            $taskApplicationItem = ['task_id' => 0, 'application_id' => 0];
            foreach ($data['applicationsIds'] as $applicationId)
            {
                $taskApplicationItem['task_id']        = $taskId;
                $taskApplicationItem['application_id'] = $applicationId;

                $taskApplicationData[] = $taskApplicationItem;
            }
            DB::table('task_application')->insert($taskApplicationData);

            // Ajout de l'ID de la tâche
            // -------------------------
            $data['id'] = $taskId;
        }

        /**
         * Modification d'une tâche
         *
         * @author Fabien Bellanger
         * @param int $userId   ID de l'utilisateur
         * @param int $sprintId ID du sprint
         * @param int $taskId   ID de la tâche
         * @param array $data   POST data (Référence)
         * @return array
         */
        static private function modifyTask($userId, $sprintId, $taskId, &$data)
        {
            // Récupération de la tâche
            // ------------------------
            //$task = self::getTask($sprintId, $taskId);

            // Mise à jou dans la table task
            // -----------------------------
            $taskData = [
                'name'               => $data['name'],
                'description'        => ($data['description']) ? $data['description'] : null,
                //'initial_duration'   => floatval($data['duration']),
                'added_after'        => intval($data['notPlanned']),
                'updated_at'         => date('Y-m-d H:i:s'),
            ];
            DB::table('task')
                ->where('id', $taskId)
                ->update($taskData);

            // Suppression des éléments de la table task_application
            // -----------------------------------------------------
            DB::table('task_application')
                ->where('task_id', $taskId)
                ->delete();

            // Ajout dans la table task_application
            // ------------------------------------
            $taskApplicationData = [];
            $taskApplicationItem = ['task_id' => 0, 'application_id' => 0];
            foreach ($data['applicationsIds'] as $applicationId)
            {
                $taskApplicationItem['task_id']        = $taskId;
                $taskApplicationItem['application_id'] = $applicationId;

                $taskApplicationData[] = $taskApplicationItem;
            }
            DB::table('task_application')->insert($taskApplicationData);

            // Ajout de l'ID de la tâche
            // -------------------------
            $data['id'] = $taskId;
        }

        /**
         * Suppression d'une tâche
         *
         * @author Fabien Bellanger
         * @param int $userId   ID de l'utilisateur
         * @param int $sprintId ID du sprint
         * @param int $taskOd   ID de la tâche
         * @return array
         */
        static public function deleteTask($userId, $sprintId, $taskId): ?array
        {
            // 1. Sprint valide ?
            // ------------------
            if (!self::isSprintValid($userId, $sprintId))
            {
                return [
                    'code'    => 404,
                    'message' => 'No sprint found',
                ];
            }

            // 2. Suppression de la tâche et des données associées
            // ---------------------------------------------------
            $query = '
                DELETE FROM task
                WHERE task.id = :taskId 
                    AND task.sprint_id = :sprintId';
            DB::delete($query, ['taskId' => $taskId, 'sprintId' => $sprintId]);

            return [
                'code'    => 200,
                'message' => 'Success',
                'data'    => $taskId,
            ]; 
        }

        /**
         * Récupération d'une tâche
         *
         * @author Fabien Bellanger
         * @param int $userId   ID de l'utilisateur
         * @param int $sprintId ID du sprint
         * @param int $taskOd   ID de la tâche
         * @return array
         */
        static public function getTaskInfo($userId, $sprintId, $taskId): ?array
        {
            // 1. Tâche valide ?
            // -----------------
            $taskId = intval($taskId);
            if ($taskId == 0)
            {
                return [
                    'code'    => 404,
                    'message' => 'No task found',
                ];
            }

            // 2. Sprint valide ?
            // ------------------
            if (!self::isSprintValid($userId, $sprintId))
            {
                return [
                    'code'    => 404,
                    'message' => 'No sprint found',
                ];
            }

            // 3. Récupération de la tâche
            // ---------------------------
            $task = self::getTask($sprintId, $taskId);
            if (!$task)
            {
                return [
                    'code'    => 500,
                    'message' => 'Internal error',
                ];
            }
            $taskData = [
                'id'                => intval($task->id),
                'sprintId'          => intval($task->sprint_id),
                'name'              => $task->name,
                'description'       => $task->description,
                'initialDuration'   => floatval($task->initial_duration),
                'remainingDuration' => floatval($task->remaining_duration),
                'addedAfter'        => intval($task->added_after),
                'applications'      => [],
            ];

            // 4. Récupération des applications
            // --------------------------------
            $query = '
                SELECT application_id AS id
                FROM task_application
                WHERE task_id = :taskId';
            $applications = DB::select($query, ['taskId' => $taskId]);
            foreach ($applications as $application)
            {
                $taskData['applications'][] = $application->id;
            }

            return [
                'code'    => 200,
                'message' => 'Success',
                'data'    => $taskData,
            ];
        }

        /**
         * Récupération des paramètres d'un sprint
         *
         * @author Fabien Bellanger
         * @param int $userId   ID de l'utilisateur
         * @param int $sprintId ID du sprint
         * @return array
         */
        static public function getSprintParameters($id, $sprintId): ?array
        {
            $sprint = [];

            // 1. Récupération du sprint
            // -------------------------
            $query   = '
                SELECT 
                    sprint.name    AS sprintName,
                    sprint.team_id AS teamId,
                    team.name      AS teamName
                FROM sprint
                    INNER JOIN team ON team.id = sprint.team_id
                WHERE sprint.id = :sprintId';
            $results = DB::select($query, ['sprintId' => $sprintId]);
            if (!$results || count($results) != 1)
            {
                return [
                    'code'    => 404,
                    'message' => 'No sprint found',
                ];
            }
            $sprint['id']   = $sprintId;
            $sprint['name'] = $results[0]->sprintName;
            $sprint['teamName'] = $results[0]->teamName;

            // 2. Récupération des membres de l'équipe
            // ---------------------------------------
            $teamId = $results[0]->teamId;
            $users = [];
            $query = '
                SELECT DISTINCT
                    users.id,
                    users.firstname,
                    users.lastname
                FROM users
                    INNER JOIN team_member ON team_member.user_id = users.id AND team_member.team_id = :teamId';
            $results = DB::select($query, ['teamId' => $teamId]);
            if ($results && count($results) > 0)
            {
                foreach ($results as $user)
                {
                    if (!array_key_exists($user->id, $users))
                    {
                        $users[$user->id] = $user->firstname . ' ' . $user->lastname;
                    }
                }
            }
            $sprint['users'] = $users;
            
            return [
                'code'    => 200,
                'message' => 'Success',
                'data'    => $sprint,
            ];
        }
    }
    