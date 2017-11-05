<?php

    namespace App\Http\Controllers;

    use App\Helpers\ResponseHelper as Response;
    use Illuminate\Http\Request;
    use App\Repositories\TeamRepository;

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
            $teams = TeamRepository::getAllTeams();
            dd($teams);
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
    