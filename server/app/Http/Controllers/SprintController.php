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
         * Liste des information d'un sprint
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
            if (!$data || count($data) == 0)
            {
                return Response::internalError('No data');
            }
            
            $response = SprintRepository::addTask($id, $sprintId, $data);
            if ($response['code'] == 404)
            {
                return Response::notFound($response['message']);
            }
            else
            {
                return Response::json($response['data'], 200);
            }
        }
    }