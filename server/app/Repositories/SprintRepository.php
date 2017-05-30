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
         * @param int $id ID de l'utilisateur
         * @param int $sprintId ID du sprint
         * @return array
         */
        public static function getSprintInfo($id, $sprintId): ?array
        {
            dd($id, $sprintId);
        }
    }