<?php

    use Illuminate\Database\Seeder;
    use Illuminate\Database\Eloquent\Model;
    use App\User;

    class DatabaseSeeder extends Seeder
    {
        /**
         * Run the database seeds.
         *
         * @return void
         */
        public function run()
        {
            Model::unguard();
            
            // Users
            // -----
            DB::table('users')->delete();
            $user = [
                'id'        => 1,
                'lastname'  => 'Bellanger',
                'firstname' => 'Fabien',
                'email'     => 'valentil@gmail.com',
                'password'  => Hash::make('0000'),
            ];
            User::create($user);

            Model::reguard();
        }
    }
