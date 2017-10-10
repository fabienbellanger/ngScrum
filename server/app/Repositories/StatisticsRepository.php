<?php

    namespace App\Repositories;

    use Auth;
    use DB;

    class StatisticsRepository
    {
        /**
         * Statistiques pour le CIR
         *
         * @author Fabien Bellanger
		 * @param  string|null $year Année souhaitée
         * @return false|Array
         */
        public static function getCIR($year): ?array
        {
            // 1. Récupération des durées par utilisateur et par tâche
            // -------------------------------------------------------
            $query = '
                SELECT
                    users.id                       AS id,
                    users.lastname                 AS lastname,
                    users.firstname                AS firstname,
                    task.id                        AS taskId,
                    SUM(task_user.worked_duration) AS duration
                FROM task_user
                    INNER JOIN task ON task.id=task_user.task_id
                    INNER JOIN users ON users.id=task_user.user_id
                WHERE task_user.date LIKE :year
                GROUP BY users.id, task.id;';
            $results = DB::select($query, ['year' => $year . '%']);

            $tabTasksDurationPerUser = [];
            if ($results)
            {
                foreach ($results as $line)
                {
                    $id        = intval($line->id);
                    $lastname  = $line->lastname;
                    $firstname = $line->firstname;
                    $taskId    = intval($line->taskId);
                    $duration  = $line->duration;

                    if (!isset($tabTasksDurationPerUser[$id]))
                    {
                        $tabTasksDurationPerUser[$id]['lastname']  = $lastname;
                        $tabTasksDurationPerUser[$id]['firstname'] = $firstname;
                        $tabTasksDurationPerUser[$id]['tasks']     = [];
                    }

                    $tabTasksDurationPerUser[$id]['tasks'][$taskId] = floatval($duration);
                }
            }

            // 2. Récupération des applications
            // --------------------------------
            $query = '
                SELECT
                    task.id          AS taskId,
                    application.id   AS applicationId,
                    application.name AS applicationName
                FROM task_user
                    INNER JOIN task ON task.id=task_user.task_id
                    LEFT JOIN task_application ON task_application.task_id=task.id
                    LEFT JOIN application ON application.id=task_application.application_id
                WHERE task_user.date LIKE :year
                GROUP BY task.id, application.id;';
            $results = DB::select($query, ['year' => $year . '%']);

            $tabTasksApplications = [];
            if ($results)
            {
                foreach ($results as $line)
                {
                    $taskId          = intval($line->taskId);
                    $applicationId   = intval($line->applicationId);
                    $applicationName = $line->applicationName;

                    if (!isset($tabTasksApplications[$taskId]))
                    {
                        $tabTasksApplications[$taskId] = [];
                    }

                    $tabTasksApplications[$taskId][$applicationId] = $applicationName;
                }
            }

            dd($tabTasksDurationPerUser, $tabTasksApplications);
        }
    }
    