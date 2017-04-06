<?php

    namespace App\Http\Controllers;

    use Illuminate\Http\Request;
    use App\Http\Requests;
    use App\Http\Controllers\Controller;
    use JWTAuth;
    use Tymon\JWTAuthExceptions\JWTException;
    use App\Helpers\ResponseHelper as Response;

    class AuthenticateController extends Controller
    {
        /**
         * Login
         *
         * @author Fabien Bellanger
         * @param Request $request
         * @return \Illuminate\Http\JsonResponse
         */
        public function login(Request $request)
        {
            $credentials = $request->only('email', 'password');

            try
            {
                // Verify the credentials and create a token for the user
                $token = JWTAuth::attempt($credentials);
                if (!$token)
                {
                    return Response::unautorized(null);
                }
            }
            catch (JWTException $e)
            {
                return Response::internalError('Could not create token');
            }

            return Response::json(compact('token'));
        }

        /**
         * Logout
         *
         * @author Fabien Bellanger
         * @return \Illuminate\Http\JsonResponse
         */
        public function logout()
        {
            JWTAuth::parseToken()->invalidate();

            return Response::respondState('Success', 'Success logout', 200);
        }
    }
