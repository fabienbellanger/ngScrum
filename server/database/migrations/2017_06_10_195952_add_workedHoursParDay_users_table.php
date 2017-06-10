<?php

    use Illuminate\Support\Facades\Schema;
    use Illuminate\Database\Schema\Blueprint;
    use Illuminate\Database\Migrations\Migration;

    class AddWorkedHoursParDayUsersTable extends Migration
    {
        /**
        * Run the migrations.
        *
        * @return void
        */
        public function up()
        {
            Schema::table('users', function (Blueprint $table)
            {
                $table->integer('worked_hours_per_day')->default(7)->after('remember_token');
            });
        }

        /**
        * Reverse the migrations.
        *
        * @return void
        */
        public function down()
        {
            Schema::table('users', function (Blueprint $table)
            {
                $table->dropColumn('worked_hours_per_day');
            });
        }
    }
