<?php

    namespace App\Repositories;

    use DB;

    class SprintRepository
    {
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
                    sprint.finished_at AS sprintFinishedAt
                FROM sprint
                    INNER JOIN team ON team.id = sprint.team_id
                    INNER JOIN team_member ON team.id = team_member.team_id AND team_member.user_id = :userId';
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
                        $sprints[$sprintId]['id']         = $sprintId;
                        $sprints[$sprintId]['name']       = $line->sprintName;
                        $sprints[$sprintId]['teamId']     = $line->teamId;
                        $sprints[$sprintId]['createdAt']  = $line->sprintCreatedAt;
                        $sprints[$sprintId]['finishedAt'] = $line->sprintFinishedAt;
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
                    task.added_after AS taskAddedAfter,
                    task.initial_duration AS initialDuration,
                    task.remaining_duration AS remainingDuration,
                    SUM(task_user.duration) AS workedDuration
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
                        $tasks[$sprintId]['initialDuration']             = 0;
                        $tasks[$sprintId]['remainingDuration']           = 0;
                        $tasks[$sprintId]['workedDuration']              = 0;
                        $tasks[$sprintId]['tasksNumber']                 = 0;
                        $tasks[$sprintId]['initialDurationAddedAfter']   = 0;
                        $tasks[$sprintId]['remainingDurationAddedAfter'] = 0;
                        $tasks[$sprintId]['workedDurationAddedAfter']    = 0;
                        $tasks[$sprintId]['tasksNumberAddedAfter']       = 0;
                    }

                    // Calculs
                    // -------
                    if (!$line->taskAddedAfter)
                    {
                        $tasks[$sprintId]['initialDuration']   += $line->initialDuration;
                        $tasks[$sprintId]['remainingDuration'] += $line->remainingDuration;
                        $tasks[$sprintId]['workedDuration']    += $line->workedDuration;
                        $tasks[$sprintId]['tasksNumber']       += 1;
                    }
                    else
                    {
                        $tasks[$sprintId]['initialDurationAddedAfter']   += $line->initialDuration;
                        $tasks[$sprintId]['remainingDurationAddedAfter'] += $line->remainingDuration;
                        $tasks[$sprintId]['workedDurationAddedAfter']    += $line->workedDuration;
                        $tasks[$sprintId]['tasksNumberAddedAfter']       += 1;
                    }
                }
            }

            return $tasks;
        }
    }