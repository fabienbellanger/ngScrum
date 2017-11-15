<?php

    namespace App\Http\Controllers;

    use App\Helpers\ResponseHelper as Response;
    use Illuminate\Http\Request;
    use App\Repositories\TeamRepository;
    use App\Repositories\UserRepository;
    use Illuminate\Support\Facades\Input;

    class TeamController extends Controller
    {
        /**
         * Liste des équipes
         *
         * @author Fabien Bellanger
         * @param \Illuminate\Http\Request $request
         * @return \Illuminate\Http\JsonResponse
         */
        public function getTeams(Request $request): \Illuminate\Http\JsonResponse
        {
            $response['teams'] = TeamRepository::getAllTeams();
            $response['users'] = UserRepository::getAllUsers();
            
            return Response::json($response, 200);
        }

        /**
         * Suppression d'une équipe
         *
         * @author Fabien Bellanger
         * @param \Illuminate\Http\Request $request
         * @param int                      $teamId
         * @return \Illuminate\Http\JsonResponse
         */
        public function deleteTeam(Request $request, int $teamId): \Illuminate\Http\JsonResponse
        {
            $response = TeamRepository::deleteTeam($teamId);
            
            if ($response['code'] == 404)
            {
                return Response::notFound($response['message']);
            }
            else
            {
                return Response::json($response['message'], 200);
            }
        }

        /**
         * Information pour créer ou modifier une équipe
         *
         * @author Fabien Bellanger
         * @param \Illuminate\Http\Request $request
         * @param int                      $teamId
         * @return \Illuminate\Http\JsonResponse
         */
        public function getTeamEdit(Request $request, int $teamId = 0): \Illuminate\Http\JsonResponse
        {
            $response = TeamRepository::getTeamEdit($teamId);
            
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
         * Création / modification d'une équipe
         *
         * @author Fabien Bellanger
         * @param \Illuminate\Http\Request $request
         * @param int                      $teamId
         * @return \Illuminate\Http\JsonResponse
         */
        public function editTeam(Request $request, int $teamId = 0): \Illuminate\Http\JsonResponse
        {
            $data = Input::all();

            $data = json_decode($data['data'], true);
            if (!$data || count($data) == 0)
            {
                return Response::internalError('No data');
            }

            if (!array_key_exists('name', $data) ||
                !array_key_exists('ownerId', $data) ||
                !array_key_exists('members', $data))
            {
                return Response::internalError('Missing data');
            }
            $response = TeamRepository::editTeam($teamId, $data);
            
            if ($response['code'] == 500)
            {
                return Response::internalError($response['message']);
            }
            else
            {
                return Response::json($response['data'], 200);
            }
        }
    }
    