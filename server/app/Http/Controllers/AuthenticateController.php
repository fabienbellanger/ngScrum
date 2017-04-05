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
                if (!$token = JWTAuth::attempt($credentials))
                {
                    return response()->json(['error' => 'invalid_credentials'], 401);
                }
            }
            catch (JWTException $e)
            {
                return response()->json(['error' => 'could_not_create_token'], 500);
            }

            return response()->json(compact('token'));
        }
    }
