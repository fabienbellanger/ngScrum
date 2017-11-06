<?php

    namespace App\Repositories;

    use Auth;
    use App;
    use DB;
    use TZ;
    use Illuminate\Support\Facades\Mail;
    use Illuminate\Support\Facades\Hash;
    use Illuminate\Support\Facades\Log;
    use App\Mail\ForgottenPassword;

    class UserRepository
    {
        /**
         * Informations à fournir après l'authentification
         *
         * @author Fabien Bellanger
         * @return Array
         */
        public static function getInformationAfterAuthentication(): ?array
        {
            $user = Auth::User();

            if (!$user)
            {
                return null;
            }

            $data = [
                'id'                => $user->id,
                'lastname'          => $user->lastname,
                'firstname'         => $user->firstname,
                'email'             => $user->email,
                'groupId'           => $user->group_id,
                'workedHoursPerDay' => $user->worked_hours_per_day,
                'timezone'          => $user->timezone,
                'teams'             => self::getTeamsIdName($user->id),
            ];

            // Récupération des applications
            // -----------------------------
            $data['applications'] = DB::select('SELECT * FROM application ORDER BY name ASC');

            return $data;
        }

        /**
         * L'utilisateur est-il valide ?
         *
         * @author Fabien Bellanger
         * @param int $id ID de l'utilisateur
         * @return bool
         */
        private static function isUserValid($id): bool
        {
            $results = DB::select('
                SELECT COUNT(*) AS nbUsers
                FROM users
                WHERE id = :id', ['id' => $id]);

            if ($results && count($results) == 1)
            {
                return ($results[0]->nbUsers == 1);
            }
            else
            {
                return false;
            }
        }

        /**
         * L'email existe t-il ?
         *
         * @author Fabien Bellanger
         * @param string $email Email de l'utilisateur
         * @return bool
         */
        private static function isEmailExists($email): bool
        {
            $results = DB::select('
                SELECT COUNT(*) AS nbEmails
                FROM users
                WHERE email = :email', ['email' => $email]);

            if ($results && count($results) == 1)
            {
                return ($results[0]->nbEmails == 1);
            }
            else
            {
                return false;
            }
        }

        /**
         * Liste des équipes (ID <=> Nom)
         *
         * @author Fabien Bellanger
         * @param int $id ID de l'utilisateur
         * @return array
         */
        public static function getTeamsIdName($id): ?array
        {
            $result = [];
            
            // L'utilisateur est-il valide ?
            // -----------------------------
            $isUserValid = self::isUserValid($id);
            if (!$isUserValid)
            {
                return [
                    'code'    => 404,
                    'message' => 'User Not Found',
                ];
            }

            // Liste des équipes
            // -----------------
            $teams = DB::select('
                SELECT id, name
                FROM team
                    INNER JOIN team_member ON team_id=id
                WHERE user_id = :id', ['id' => $id]);

            return $teams;
        }

        /**
         * Liste des équipes (réponse JSON)
         *
         * @author Fabien Bellanger
         * @param int $id ID de l'utilisateur
         * @return array
         */
        public static function getTeams($id): ?array
        {
            $result = [];
            
            // L'utilisateur est-il valide ?
            // -----------------------------
            $isUserValid = self::isUserValid($id);
            if (!$isUserValid)
            {
                return [
                    'code'    => 404,
                    'message' => 'User Not Found',
                ];
            }

            // Liste des équipes
            // -----------------
            $teams = DB::select('
                SELECT id, name, picture_url, owner_id
                FROM team
                    INNER JOIN team_member ON team_id=id
                WHERE user_id = :id', ['id' => $id]);

            return [
                'code'    => 200,
                'message' => 'Success',
                'data'    => $teams,
            ];
        }

        /**
         * Mot de passe oublié
         *
         * @author Fabien Bellanger
         * @param string $email Email de l'utilisateur
         * @return array
         */
        public static function forgottenPassword($email): ?array
        {
            // 1. Vérification de l'existence de l'email
            // -----------------------------------------
            $emailExists = self::isEmailExists($email);
            if (!$emailExists)
            {
                return [
                    'code'    => 404,
                    'message' => 'Email not found',
                ];
            }

            // 2. On écrit dans la table password_resets
            // -----------------------------------------
            $timezone = self::getTimezone();
            $token    = hash('sha512', uniqid() . $email);
            $data     = [
                'email'      => $email,
                'token'      => $token,
                'created_at' => TZ::getUTCDatetime2($timezone, date('Y-m-d H:i:s'), 'Y-m-d H:i:s'),
            ];
            DB::table('password_resets')->insert($data);

            // 3. On remet à '' le champ password de l'utilisateur
            // ---------------------------------------------------
            DB::table('users')
                ->where('email', $email)
                ->update(['password' => '']);

            // 4. Envoi du mail
            // ----------------
            if (App::environment('local'))
            {
                // En local on loggue
                // ------------------
                Log::info('[Forgotten Password] Send Token by mail: ' . $token);
            }
            else
            {
                Mail::to($email)->send(new ForgottenPassword($token));
            }

            return [
                'code'    => 200,
                'message' => 'Success',
                'data'    => ['token' => $token],
            ];
        }
        
        /**
         * Mot de passe oublié
         *
         * @author Fabien Bellanger
         * @param string $token     Token
         * @param string $password  Nouveau mot de passe
         * @return array
         */
        public static function newPassword($token, $password): ?array
        {
            // 1. Recherche de l'email à partir du token
            // -----------------------------------------
            $results = DB::select('
                SELECT email, used_at
                FROM password_resets
                WHERE token = :token', ['token' => $token]);

            if ($results && count($results) == 1)
            {
                if ($results[0]->used_at)
                {
                    return [
                        'code'    => 400,
                        'message' => 'Forgotten password token already used',
                    ];
                }
                $email = $results[0]->email;
            }
            else
            {
                return [
                    'code'    => 404,
                    'message' => 'Email not found',
                ];
            }

            // 2. Recherche de l'Id de l'utilisateur par son email
            // ---------------------------------------------------
            $results = DB::select('
                SELECT id
                FROM users
                WHERE email = :email', ['email' => $email]);
            if ($results && count($results) == 1)
            {
                $userId = $results[0]->id;
            }
            else
            {
                return [
                    'code'    => 404,
                    'message' => 'User not found',
                ];
            }

            // 3. Modification du mot de passe
            // -------------------------------
            DB::table('users')
                ->where('id', $userId)
                ->update(['password' => Hash::make($password)]);

            // 4. On indique que le token a été utilisé
            // ----------------------------------------
            $timezone  = self::getTimezone();
            $usedAt    = TZ::getUTCDatetime2($timezone, date('Y-m-d H:i:s'), 'Y-m-d H:i:s');
            DB::table('password_resets')
                ->where('token', $token)
                ->update(['used_at' => $usedAt]);

            return [
                'code'    => 200,
                'message' => 'Success',
            ];
        }

        /**
         * Récupère le timezone de l'utilisateur connecté
         *
         * @author Fabien Bellanger
         * @return string Timezone
         */
        static public function getTimezone(): string
        {
            $user = Auth::User();
            
            if (!$user)
            {
                return 'UTC';
            }

            return $user->timezone;
        }
        
        /**
         * Liste de tous les utilisateurs
         * 
         * @author Fabien Bellanger
         * @return array
         */
        public static function getAllUsers(): array
        {
            $users = [];

            $query   = 'SELECT id, lastname, firstname, email FROM users';
            $results = DB::select($query);
            if ($results)
            {
                foreach ($results as $index => $line)
                {
                    $users[$index]['id']        = $line->id;
                    $users[$index]['lastname']  = $line->lastname;
                    $users[$index]['firstname'] = $line->firstname;
                    $users[$index]['email']     = $line->email;
                }
            }

            return $users;
        }
    }
