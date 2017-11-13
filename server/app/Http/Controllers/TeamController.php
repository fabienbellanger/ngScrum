<?php

    namespace App\Http\Controllers;

    use App\Helpers\ResponseHelper as Response;
    use Illuminate\Http\Request;
    use App\Repositories\TeamRepository;
    use App\Repositories\UserRepository;

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
    }
    