<?php

    namespace App\Repositories;

    use DB;

    class TaskRepository
    {
        /**
         * Récupération des types de tâche
         *
         * @author Fabien Bellanger
         * @return array
         */
        static public function getTaskTypes(): array
        {
            return [
				1 => 'bug',
				2 => 'new',
				3 => 'improvement',
				4 => 'test',
				5 => 'configuration',
			];
        }
        
        /**
         * Récupération des types de tâche
         *
         * @author Fabien Bellanger
         * @param int $taskId ID de la tâche
         * @return int
         */
        static public function getTaskRemainingDuration(int $taskId): int
        {
            $query   = '
                SELECT remaining_duration
                FROM task
                WHERE id = :taskId';
            $results = DB::select($query, ['taskId' => $taskId]);

            $remainingDuration = 0;
            if ($results && count($results) === 1)
            {
                $remainingDuration = $results[0]->remaining_duration;
            }

            return $remainingDuration;
        }
    }
