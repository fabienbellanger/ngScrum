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
            $query = '
                SELECT
                    users.lastname                 AS lastname,
                    users.firstname                AS firstname,
                    application.name               AS applicationName,
                    SUM(task_user.worked_duration) AS duration
                FROM task_user
                    INNER JOIN task ON task.id=task_user.task_id
                    INNER JOIN users ON users.id=task_user.user_id
                    INNER JOIN task_application ON task.id=task_application.task_id
                    INNER JOIN application ON application.id=task_application.application_id
                WHERE task_user.date LIKE :year
                GROUP BY users.id, application.id;';
            $results = DB::select($query, ['year' => $year . '%']);

            // TODO: Problème avec les tâches multi-applications
            // Trop d'heures sont comptabilisées
            dd($results);
        }
    }
    