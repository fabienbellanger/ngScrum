<?php

    namespace App\Http\Controllers;

    use App\Helpers\ResponseHelper as Response;
    use Illuminate\Http\Request;
    use App\Repositories\UserRepository;

    class UserController extends Controller
    {
        /**
         * Liste des équipes d'un utilisateur
         *
         * @author Fabien Bellanger
         * @param \Illuminate\Http\Request $request
         * @param int $id ID de l'utilisateur
         * @return \Illuminate\Http\JsonResponse
         */
        public function getTeams(Request $request, $id)
        {
            $response = UserRepository::getTeams($id);

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
         * Liste de tous les sprints d'un utilisateur
         *
         * @author Fabien Bellanger
         * @param \Illuminate\Http\Request $request
         * @param int $id ID de l'utilisateur
         * @return \Illuminate\Http\JsonResponse
         */
        public function getAllSprints(Request $request, $id)
        {
            $response = UserRepository::getSprints($id, 'all');

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
            $response = UserRepository::getSprints($id, $state);

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