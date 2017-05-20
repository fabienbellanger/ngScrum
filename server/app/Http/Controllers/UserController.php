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
    }