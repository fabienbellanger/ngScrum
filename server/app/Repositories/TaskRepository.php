<?php

    namespace App\Repositories;

    class TaskRepository
    {
        /**
         * Récupération des types de tâche
         *
         * @author Fabien Bellanger
         * @return Array
         */
        public static function getTaskTypes(): array
        {
            return [
				1 => 'bug',
				2 => 'new',
				3 => 'improvement',
				4 => 'test',
				5 => 'configuration',
			];
        }
    }
