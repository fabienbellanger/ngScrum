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
         * @return array
         */
        public static function getCIR($year): array
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
                        $tabTasksDurationPerUser[$id]['id']        = $id;
                        $tabTasksDurationPerUser[$id]['lastname']  = $lastname;
                        $tabTasksDurationPerUser[$id]['firstname'] = $firstname;
                        $tabTasksDurationPerUser[$id]['tasks']     = [];
                    }

                    $tabTasksDurationPerUser[$id]['tasks'][$taskId]['duration'] = floatval($duration);
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

            // 3. Construction du tableau final
            // --------------------------------
            foreach ($tabTasksDurationPerUser as $userId => $userInfo)
            {
                $userApplications  = [];
                $userTotalDuration = 0;

                foreach ($userInfo['tasks'] as $taskId => $taskInfo)
                {
                    if (isset($tabTasksApplications[$taskId]))
                    {
                        $nbApplications    = count($tabTasksApplications[$taskId]);
                        $remainingDuration = $taskInfo['duration'];
                        $userTotalDuration += $taskInfo['duration'];
                        $index             = 0;
                        
                        foreach ($tabTasksApplications[$taskId] as $applicationId => $applicationName)
                        {
                            if ($index == $nbApplications - 1)
                            {
                                // Dernière application
                                // --------------------
                                $tabTasksDurationPerUser[$userId]['tasks'][$taskId]['applications'][$applicationId] = round($remainingDuration, 2);
                            }
                            else
                            {
                                $tabTasksDurationPerUser[$userId]['tasks'][$taskId]['applications'][$applicationId] = round($taskInfo['duration'] / $nbApplications, 2);

                                // Mise à jour de la durée restante à répartir
                                // -------------------------------------------
                                $remainingDuration -= $tabTasksDurationPerUser[$userId]['tasks'][$taskId]['applications'][$applicationId];
                            }

                            // On rempli de tableau des applications de l'utilisateur
                            // ------------------------------------------------------
                            if (!isset($userApplications[$applicationId]))
                            {
                                $userApplications[$applicationId]['name']     = $applicationName;
                                $userApplications[$applicationId]['duration'] = $tabTasksDurationPerUser[$userId]['tasks'][$taskId]['applications'][$applicationId];
                            }
                            else
                            {
                                $userApplications[$applicationId]['duration'] += $tabTasksDurationPerUser[$userId]['tasks'][$taskId]['applications'][$applicationId];
                            }

                            $index++;
                        }
                    }
                }
                
                // On structure la tableau par application
                // ---------------------------------------
                $tabTasksDurationPerUser[$userId]['applications']   = $userApplications;
                $tabTasksDurationPerUser[$userId]['totalDuration']  = $userTotalDuration;
                unset($tabTasksDurationPerUser[$userId]['tasks']);
            }
            
            $tabTasksDurationPerUser = array_values($tabTasksDurationPerUser);

            // 4. Liste des années disponibles
            // -------------------------------
            $query = '
                SELECT DISTINCT SUBSTRING(task_user.date, 1, 4) AS year
                FROM task_user
                ORDER BY year ASC';
            $results = DB::select($query);

            $years = [];
            if ($results && count($results) > 0)
            {
                foreach ($results as $item)
                {
                    $years[] = $item->year;
                }
            }

            return [
                'code'    => 200,
                'message' => 'Success',
                'data'    => [
                    'data'  => $tabTasksDurationPerUser,
                    'years' => $years,
                ],
            ];
        }
    }
    