<?php

    namespace App\Repositories;

    use Auth;
    use DB;

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
            $result = [];

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
            $token = hash('sha512', uniqid() . $email);
            $data  = [
                'email'      => $email,
                'token'      => $token,
                'created_at' => date('Y-m-d H:i:s'),
            ];
            DB::table('password_resets')->insert($data);

            return [
                'code'    => 200,
                'message' => 'Success',
                'data'    => ['token' => $token],
            ];
        }
    }