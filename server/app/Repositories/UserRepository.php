<?php

    namespace App\Repositories;

    use Auth;

    class UserRepository
    {
        /**
         * Informations à fournir après l'authentification
         *
         * @author Fabien Bellanger
         */
        public static function getInformationAfterAuthentication(): ?Array
        {
            $user = Auth::User();

            if (!$user)
            {
                return null;
            }

            $data = [
                'lastname'  => $user->lastname,
                'firstname' => $user->firstname,
                'email'     => $user->email,
                'groupId'   => $user->group_id
            ];

            return $data;
        }
    }