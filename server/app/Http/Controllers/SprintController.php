<?php

    namespace App\Http\Controllers;

    use App\Helpers\ResponseHelper as Response;
    use Illuminate\Http\Request;
    use App\Repositories\SprintRepository;
    use Illuminate\Support\Facades\Input;

    class SprintController extends Controller
    {
        /**
         * Liste de tous les sprints d'un utilisateur
         *
         * @author Fabien Bellanger
         * @param \Illuminate\Http\Request $request
         * @param int $id ID de l'utilisateur
         * @return \Illuminate\Http\JsonResponse
         */
        public function getAllSprints(Request $request, $id)
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
         * @param int $id ID de l'utilisateur
         * @param string $state Type de recherche {all, inProgress, finished}
         * @return \Illuminate\Http\JsonResponse
         */
        public function getSprints(Request $request, $id, $state)
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
         * @param int $id ID de l'utilisateur
         * @param int $sprintId ID du sprint
         * @return \Illuminate\Http\JsonResponse
         */
        public function getSprintInfo(Request $request, $id, $sprintId)
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
         * @param int    $id       ID de l'utilisateur
         * @param int    $sprintId ID du sprint
         * @param strint $date     Date
         * @return \Illuminate\Http\JsonResponse
         */
        public function getSprintManagement(Request $request, $id, $sprintId, $date=null)
        {
            $date     = ($date) ? $date : date('Y-m-d');
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
         * @param int $id ID de l'utilisateur
         * @param int $sprintId ID du sprint
         * @return \Illuminate\Http\JsonResponse
         */
        public function addTask(Request $request, $id, $sprintId)
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
         * @param int $id ID de l'utilisateur
         * @param int $sprintId ID du sprint
         * @param int $taskId ID d'une tâche
         * @return \Illuminate\Http\JsonResponse
         */
        public function modifyTask(Request $request, $id, $sprintId, $taskId)
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
         * @param int $id ID de l'utilisateur
         * @param int $sprintId ID du sprint
         * @param int $taskId ID d'une tâche
         * @return \Illuminate\Http\JsonResponse
         */
        public function deleteTask(Request $request, $id, $sprintId, $taskId)
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
         * @param int $id ID de l'utilisateur
         * @param int $sprintId ID du sprint
         * @param int $taskId ID d'une tâche
         * @return \Illuminate\Http\JsonResponse
         */
        public function getTask(Request $request, $id, $sprintId, $taskId)
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
         * @param int $id ID de l'utilisateur
         * @param int $sprintId ID du sprint
         * @return \Illuminate\Http\JsonResponse
         */
        public function getSprintParameters(Request $request, $id, $sprintId)
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
         * @param int $id ID de l'utilisateur
         * @param int $sprintId ID du sprint
         * @return \Illuminate\Http\JsonResponse
         */
        public function modifySprintParameters(Request $request, $id, $sprintId)
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
         * Modification d'une taskUser
         *
         * @author Fabien Bellanger
         * @param \Illuminate\Http\Request $request
         * @param int $id ID de l'utilisateur
         * @param int $sprintId ID du sprint
         * @param int $taskId ID d'une tâche
         * @return \Illuminate\Http\JsonResponse
         */
        public function modifyTaskUser(Request $request, $id, $sprintId, $taskId)
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
                !array_key_exists('workedHours', $data) ||
                !array_key_exists('remainingHours', $data))
            {
                return Response::internalError('Missing data');
            }

            $response = SprintRepository::modifyTaskUser($id, $sprintId, $taskId, $data);

            /*if ($response['code'] == 404)
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
            }*/
        }
    }
