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

            // Groups
            // ------
            $groups = [
                ['id' => 1, 'name' => 'Administrator', 'parent_id' => null],
                ['id' => 2, 'name' => 'Product Onwer', 'parent_id' => 1],
                ['id' => 3, 'name' => 'Scrum Master', 'parent_id' => 1],
                ['id' => 4, 'name' => 'Project Manager', 'parent_id' => 3],
                ['id' => 5, 'name' => 'Developer', 'parent_id' => 4]
            ];
            DB::table('group')->insert($groups);
            
            // Users
            // -----
            $users = [
                [
                    'id'        => 1,
                    'group_id'  => 1,
                    'lastname'  => 'Bellanger',
                    'firstname' => 'Fabien',
                    'email'     => 'valentil@gmail.com',
                    'password'  => Hash::make('0000')
                ]
            ];
            DB::table('users')->delete();
            DB::table('users')->insert($users);

            // Teams
            // -----
            $teams = [
                ['id' => 1, 'name' => 'Apitic', 'owner_id' => 1, 'created_at' => '2017-05-01', 'updated_at' => '2017-05-01']
            ];
            DB::table('team')->insert($teams);
            $teamMembers = [
                ['team_id' => 1, 'user_id' => 1]
            ];
            DB::table('team_member')->insert($teamMembers);

            // Applications
            // ------------
            $applications = [
                ['id' => 1, 'name' => 'Web-Caisse'],
                ['id' => 2, 'name' => 'Fid\'Elite'],
                ['id' => 3, 'name' => 'ApiCoupon'],
                ['id' => 4, 'name' => 'ApiFac'],
                ['id' => 5, 'name' => 'ApiExport'],
                ['id' => 6, 'name' => 'Prepaid Card'],
                ['id' => 7, 'name' => 'ApiCate'],
                ['id' => 8, 'name' => 'Preparation Screen'],
                ['id' => 9, 'name' => 'Interface de livraison'],
                ['id' => 10, 'name' => 'ApiProd'],
                ['id' => 11, 'name' => 'DCPro'],
                ['id' => 12, 'name' => 'ApiLiv'],
                ['id' => 13, 'name' => 'ApiTracker'],
                ['id' => 14, 'name' => 'ApiFile'],
                ['id' => 15, 'name' => 'Apitic Account'],
                ['id' => 16, 'name' => 'Online Printing Command'],
                ['id' => 17, 'name' => 'HACCP'],
                ['id' => 18, 'name' => 'La boîte à pizza'],
                ['id' => 19, 'name' => 'ApiShop'],
                ['id' => 20, 'name' => 'Mythic Burger'],
                ['id' => 21, 'name' => 'Jour'],
                ['id' => 22, 'name' => 'Eat SUSHI']
            ];
            DB::table('application')->insert($applications);

            Model::reguard();
        }
    }
