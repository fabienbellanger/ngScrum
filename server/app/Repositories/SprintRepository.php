<?php

    namespace App\Repositories;

    use DB;

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
         * Liste des sprints d'un utilisateur
         *
         * @author Fabien Bellanger
         * @param int    $userId ID de l'utilisateur
         * @param string $filter Filtre {'all', 'finished', 'inProgress'}
         * @return array
         */
        public static function getSprintsOfUser($userId, $filter)
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
                        $sprints[$sprintId]['progressPercent']   = round((($line->initialDuration - $line->remainingDuration) / $line->initialDuration) * 100, 2);
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
        public static function getSprintsWorkedDurationOfUser($userId, $filter)
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
         * @param int $id       ID de l'utilisateur
         * @param int $sprintId ID du sprint
         * @return array
         */
        public static function getSprintInfo($id, $sprintId): ?array
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
                    INNER JOIN task_user ON task_user.task_id = task.id
                WHERE task.sprint_id = :sprintId
                ORDER BY task_user.date ASC';
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
                    $tasks[$taskId]['initialDuration']   = $task->taskInitialDuration;
                    $tasks[$taskId]['remainingDuration'] = $task->taskRemainingDuration;
                    $tasks[$taskId]['userId']            = $task->taskUserId;
                    $tasks[$taskId]['addedAfter']        = $task->taskAddedAfter;
                    $tasks[$taskId]['list']              = [];
                }

                if (!array_key_exists($taskPartId, $tasks[$taskId]['list']))
                {
                    $tasks[$taskId]['list'][$taskPartId]['id']             = $taskPartId;
                    $tasks[$taskId]['list'][$taskPartId]['userId']         = $task->taskPartUserId;
                    $tasks[$taskId]['list'][$taskPartId]['duration']       = $task->taskPartDuration;
                    $tasks[$taskId]['list'][$taskPartId]['workedDuration'] = $task->taskPartWorkedDuration;
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
    }