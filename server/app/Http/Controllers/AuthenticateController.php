<?php

    namespace App\Http\Controllers;

    use App\Helpers\ResponseHelper as Response;
    use App\Http\Requests;
    use App\Repositories\UserRepository;
    use Auth;
    use Illuminate\Http\Request;
    use JWTAuth;
    use Tymon\JWTAuthExceptions\JWTException;
    use Illuminate\Support\Facades\Input;

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

            // On récupère les informations de l'utilisateur
            // ---------------------------------------------
            $user = UserRepository::getInformationAfterAuthentication();
            
            if (!$user)
            {
                return Response::internalError('User not found');
            }

            return Response::json(
                [
                    'token' => $token,
                    'user'  => $user,
                ]);
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

        /**
         * Mot de passe oublié
         *
         * @author Fabien Bellanger
         * @return \Illuminate\Http\JsonResponse
         */
        public function forgottenPassword()
        {
            $data = Input::all();
            if (!array_key_exists('email', $data))
            {
                return Response::badRequest('No data');
            }

            // Valididé de l'email ?
            if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL))
            {
                return Response::badRequest('Email not valid');
            }

            $response = UserRepository::forgottenPassword($data['email']);
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
         * Nouveau mot de passe
         *
         * @author Fabien Bellanger
         * @return \Illuminate\Http\JsonResponse
         */
        public function newPassword()
        {
            $data = Input::all();
            if (!array_key_exists('password', $data) || !array_key_exists('token', $data))
            {
                return Response::badRequest('No data');
            }

            $response = UserRepository::newPassword($data['token'], $data['password']);
            if ($response['code'] == 404)
            {
                return Response::notFound($response['message']);
            }
            else
            {
                return Response::json(null, 200);
            }
        }
    }
