<?php

    namespace App\Http\Controllers;

    use App\Helpers\ResponseHelper as Response;
    use App\Repositories\SprintRepository;
    use App\Repositories\UserRepository;
    use Illuminate\Http\Request;
    use Illuminate\Support\Facades\Input;

    use TZ;
    class SprintController extends Controller
    {
        /**
         * Liste de tous les sprints d'un utilisateur
         *
         * @author Fabien Bellanger
         * @param \Illuminate\Http\Request $request
         * @param int                      $id ID de l'utilisateur
         * @return \Illuminate\Http\JsonResponse
         */
        public function getAllSprints(Request $request, int $id): \Illuminate\Http\JsonResponse
        {
            $response = SprintRepository::getSprints($id, 'all');

            if ($response['code'] == 404)
            {
                return Response::notFound($response['message']);
            }
            else
            {
                return Response::json($response['data'], 200);
            }
        }

        /**
         * Liste des sprints d'un utilisateur
         *
         * @author Fabien Bellanger
         * @param \Illuminate\Http\Request $request
         * @param int                      $id    ID de l'utilisateur
         * @param string                   $state Type de recherche {all, inProgress, finished}
         * @return \Illuminate\Http\JsonResponse
         */
        public function getSprints(Request $request, int $id, string $state): \Illuminate\Http\JsonResponse
        {
            $response = SprintRepository::getSprints($id, $state);

            if ($response['code'] == 404)
            {
                return Response::notFound($response['message']);
            }
            else
            {
                return Response::json($response['data'], 200);
            }
        }

        /**
         * Information d'un sprint
         *
         * @author Fabien Bellanger
         * @param \Illuminate\Http\Request $request
         * @param int                      $id       ID de l'utilisateur
         * @param int                      $sprintId ID du sprint
         * @return \Illuminate\Http\JsonResponse
         */
        public function getSprintInfo(Request $request, int $id, int $sprintId): \Illuminate\Http\JsonResponse
        {
            $response = SprintRepository::getSprintInfo($id, $sprintId);

            if ($response['code'] == 404)
            {
                return Response::notFound($response['message']);
            }
            else
            {
                return Response::json($response['data'], 200);
            }
        }

        /**
         * Information d'un sprint pour la création des task_user
         *
         * @author Fabien Bellanger
         * @param \Illuminate\Http\Request $request
         * @param int                      $id       ID de l'utilisateur
         * @param int                      $sprintId ID du sprint
         * @param strint                   $date     Date
         * @return \Illuminate\Http\JsonResponse
         */
        public function getSprintManagement(Request $request, int $id, int $sprintId, string $date = null): \Illuminate\Http\JsonResponse
        {
            $timezone = UserRepository::getTimezone();
            $date     = ($date)
                ? $date
                : TZ::getLocalDatetime2($timezone, date('Y-m-d H:i:s'), 'Y-m-d');

            $response = SprintRepository::getSprintManagement($id, $sprintId, $date);

            if ($response['code'] == 404)
            {
                return Response::notFound($response['message']);
            }
            else
            {
                return Response::json($response['data'], 200);
            }
        }

        /**
         * Ajout d'une tâche
         *
         * @author Fabien Bellanger
         * @param \Illuminate\Http\Request $request
         * @param int                      $id       ID de l'utilisateur
         * @param int                      $sprintId ID du sprint
         * @return \Illuminate\Http\JsonResponse
         */
        public function addTask(Request $request, int $id, int $sprintId): \Illuminate\Http\JsonResponse
        {
            $data = Input::all();
            if (!array_key_exists('data', $data))
            {
                return Response::badRequest('No data');
            }

            $data = json_decode($data['data'], true);
            if (!$data || count($data) == 0)
            {
                return Response::badRequest('No data');
            }

            $response = SprintRepository::editTask($id, $sprintId, $data);
            if ($response['code'] == 404)
            {
                return Response::notFound($response['message']);
            }
            elseif ($response['code'] == 500)
            {
                return Response::internalError($response['message']);
            }
            else
            {
                return Response::json($response['data'], 200);
            }
        }

        /**
         * Modification d'une tâche
         *
         * @author Fabien Bellanger
         * @param \Illuminate\Http\Request $request
         * @param int                      $id       ID de l'utilisateur
         * @param int                      $sprintId ID du sprint
         * @param int                      $taskId   ID d'une tâche
         * @return \Illuminate\Http\JsonResponse
         */
        public function modifyTask(Request $request, int $id, int $sprintId, int $taskId): \Illuminate\Http\JsonResponse
        {
            $data = Input::all();
            if (!array_key_exists('data', $data))
            {
                return Response::internalError('No data');
            }

            $data = json_decode($data['data'], true);
            if (!$data || count($data) == 0)
            {
                return Response::internalError('No data');
            }

            $response = SprintRepository::editTask($id, $sprintId, $data, $taskId);
            if ($response['code'] == 404)
            {
                return Response::notFound($response['message']);
            }
            elseif ($response['code'] == 500)
            {
                return Response::internalError($response['message']);
            }
            else
            {
                return Response::json($response['data'], 200);
            }
        }

        /**
         * Suppression d'une tâche
         *
         * @author Fabien Bellanger
         * @param \Illuminate\Http\Request $request
         * @param int                      $id       ID de l'utilisateur
         * @param int                      $sprintId ID du sprint
         * @param int                      $taskId   ID d'une tâche
         * @return \Illuminate\Http\JsonResponse
         */
        public function deleteTask(Request $request, int $id, int $sprintId, int $taskId): \Illuminate\Http\JsonResponse
        {
            $response = SprintRepository::deleteTask($id, $sprintId, $taskId);

            if ($response['code'] == 404)
            {
                return Response::notFound($response['message']);
            }
            else
            {
                return Response::json(null, 200);
            }
        }

        /**
         * Récupération d'une tâche
         *
         * @author Fabien Bellanger
         * @param \Illuminate\Http\Request $request
         * @param int                      $id       ID de l'utilisateur
         * @param int                      $sprintId ID du sprint
         * @param int                      $taskId   ID d'une tâche
         * @return \Illuminate\Http\JsonResponse
         */
        public function getTask(Request $request, int $id, int $sprintId, int $taskId): \Illuminate\Http\JsonResponse
        {
            $response = SprintRepository::getTaskInfo($id, $sprintId, $taskId);

            if ($response['code'] == 404)
            {
                return Response::notFound($response['message']);
            }
            elseif ($response['code'] == 500)
            {
                return Response::internalError($response['message']);
            }
            else
            {
                return Response::json($response['data'], 200);
            }
        }

        /**
         * Récupération des paramètres d'un sprint
         *
         * @author Fabien Bellanger
         * @param \Illuminate\Http\Request $request
         * @param int                      $id       ID de l'utilisateur
         * @param int                      $sprintId ID du sprint
         * @return \Illuminate\Http\JsonResponse
         */
        public function getSprintParameters(Request $request, int $id, int $sprintId): \Illuminate\Http\JsonResponse
        {
            $response = SprintRepository::getSprintParameters($id, $sprintId);
            if ($response['code'] == 404)
            {
                return Response::notFound($response['message']);
            }
            elseif ($response['code'] == 500)
            {
                return Response::internalError($response['message']);
            }
            else
            {
                return Response::json($response['data'], 200);
            }
        }

        /**
         * Modification des paramètres d'un sprint
         *
         * @author Fabien Bellanger
         * @param \Illuminate\Http\Request $request
         * @param int                      $id       ID de l'utilisateur
         * @param int                      $sprintId ID du sprint
         * @return \Illuminate\Http\JsonResponse
         */
        public function modifySprintParameters(Request $request, int $id, int $sprintId): \Illuminate\Http\JsonResponse
        {
            $data = Input::all();
            if (!array_key_exists('data', $data))
            {
                return Response::badRequest('No data');
            }

            $data = json_decode($data['data'], true);
            if (!$data || count($data) == 0)
            {
                return Response::badRequest('No data');
            }

            if (!array_key_exists('name', $data) || !array_key_exists('startedAt', $data) ||
                !array_key_exists('usersId', $data))
            {
                return Response::badRequest('Bad data');
            }

            $response = SprintRepository::modifySprintParameters($id, $sprintId, $data);

            return Response::json($response, 200);
        }

        /**
         * Création / Modification d'une taskUser
         *
         * @author Fabien Bellanger
         * @param \Illuminate\Http\Request $request
         * @param int                      $id       ID de l'utilisateur
         * @param int                      $sprintId ID du sprint
         * @param int                      $taskId   ID d'une tâche
         * @return \Illuminate\Http\JsonResponse
         */
        public function editTaskUser(Request $request, int $id, int $sprintId, int $taskId): \Illuminate\Http\JsonResponse
        {
            $data = Input::all();
            if (!array_key_exists('data', $data))
            {
                return Response::internalError('No data');
            }

            $data = json_decode($data['data'], true);
            if (!$data || count($data) == 0)
            {
                return Response::internalError('No data');
            }

            if (!array_key_exists('userId', $data) ||
                !array_key_exists('date', $data) ||
                !array_key_exists('duration', $data) ||
                !array_key_exists('workedDuration', $data) ||
                !array_key_exists('remainingDuration', $data))
            {
                return Response::internalError('Missing data');
            }

            $response = SprintRepository::editTaskUser($id, $sprintId, $taskId, $data);

            if ($response['code'] == 404)
            {
                return Response::notFound($response['message']);
            }
            elseif ($response['code'] == 500)
            {
                return Response::internalError($response['message']);
            }
            else
            {
                return Response::json($response['data'], 200);
            }
        }

        /**
         * Ajout d'un sprint
         *
         * @author Fabien Bellanger
         * @param \Illuminate\Http\Request $request
         * @param int                      $id       ID de l'utilisateur
         * @return \Illuminate\Http\JsonResponse
         */
        public function newSprint(Request $request, int $id): \Illuminate\Http\JsonResponse
        {
            $data = Input::all();
            if (!array_key_exists('data', $data))
            {
                return Response::internalError('No data');
            }

            $data = json_decode($data['data'], true);
            if (!$data || count($data) == 0)
            {
                return Response::internalError('No data');
            }

            if (!array_key_exists('name', $data) ||
                !array_key_exists('teamId', $data) ||
                !array_key_exists('startedAt', $data) ||
                !array_key_exists('deliveredAt', $data))
            {
                return Response::internalError('Missing data');
            }

            $response = SprintRepository::newSprint($id, $data);
            
            if ($response['code'] == 404)
            {
                return Response::notFound($response['message']);
            }
            elseif ($response['code'] == 500)
            {
                return Response::internalError($response['message']);
            }
            else
            {
                return Response::json($response['data'], 200);
            }
        }
        
        /**
         * Suppression d'un sprint
         *
         * @author Fabien Bellanger
         * @param \Illuminate\Http\Request $request
         * @param int                      $id       ID de l'utilisateur
         * @param int                      $sprintId ID du sprint
         * @return \Illuminate\Http\JsonResponse
         */
        public function deleteSprint(Request $request, int $id, int $sprintId): \Illuminate\Http\JsonResponse
        {
            $response = SprintRepository::deleteSprint($id, $sprintId);
      
            if ($response['code'] == 404)
            {
                return Response::notFound($response['message']);
            }
            else
            {
                return Response::json(null, 200);
            }
        }
        
        /**
         * Suppression d'une taskUser
         *
         * @author Fabien Bellanger
         * @param \Illuminate\Http\Request $request
         * @param int                      $id       ID de l'utilisateur
         * @param int                      $sprintId ID du sprint
         * @param int                      $taskId   ID d'une tâche
         * @param string                   $date     Date au format YYYY-MM-DD
         * @return \Illuminate\Http\JsonResponse
         */
        public function deleteTaskUser(Request $request, int $id, int $sprintId, int $taskId, string $date): \Illuminate\Http\JsonResponse
        {
            if (!$id || !$sprintId || !$taskId || !$date)
            {
                return Response::internalError('Missing or bad data');
            }

            $response = SprintRepository::deleteTaskUser($id, $sprintId, $taskId, $date);

            if ($response['code'] == 404)
            {
                return Response::notFound($response['message']);
            }
            else
            {
                return Response::json(null, 200);
            }
        }
        
        /**
         * Terminaison d'un sprint
         *
         * @author Fabien Bellanger
         * @param \Illuminate\Http\Request $request
         * @param int                      $id       ID de l'utilisateur
         * @param int                      $sprintId ID du sprint
         * @return \Illuminate\Http\JsonResponse
         */
        public function finishSprint(Request $request, int $id, int $sprintId): \Illuminate\Http\JsonResponse
        {
            $response = SprintRepository::finishOrReOpenSprint($id, $sprintId, 'finish');

            return Response::json(null, 200);
        }
        
        /**
         * Ré-ouverture d'un sprint
         *
         * @author Fabien Bellanger
         * @param \Illuminate\Http\Request $request
         * @param int                      $id       ID de l'utilisateur
         * @param int                      $sprintId ID du sprint
         * @return \Illuminate\Http\JsonResponse
         */
        public function reOpenSprint(Request $request, int $id, int $sprintId): \Illuminate\Http\JsonResponse
        {
            $response = SprintRepository::finishOrReOpenSprint($id, $sprintId, 're-open');

            if ($response['code'] == 404)
            {
                return Response::notFound($response['message']);
            }
            else
            {
                return Response::json($response['message'], 200);
            }
        }
    }
