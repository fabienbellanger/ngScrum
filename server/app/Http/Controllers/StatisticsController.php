<?php

    namespace App\Http\Controllers;

    use App\Helpers\ResponseHelper as Response;
    use Illuminate\Http\Request;
    use App\Repositories\StatisticsRepository;

    class StatisticsController extends Controller
    {
        /**
         * Statistiques année pour le CIR
         *
         * @author Fabien Bellanger
         * @param \Illuminate\Http\Request $request
         * @param string                   $year
         * @return \Illuminate\Http\JsonResponse
         */
        public function getCIR(Request $request, string $year = null): \Illuminate\Http\JsonResponse
        {
            $response = StatisticsRepository::getCIR($year);

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
         * Dashboard
         *
         * @author Fabien Bellanger
         * @param \Illuminate\Http\Request $request
         * @return \Illuminate\Http\JsonResponse
         */
        public function getDashboard(Request $request): \Illuminate\Http\JsonResponse
        {
            $response = StatisticsRepository::getDashboard();

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
    