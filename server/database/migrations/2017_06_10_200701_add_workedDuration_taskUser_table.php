<?php

    use Illuminate\Support\Facades\Schema;
    use Illuminate\Database\Schema\Blueprint;
    use Illuminate\Database\Migrations\Migration;

    class AddWorkedDurationTaskUserTable extends Migration
    {
        /**
        * Run the migrations.
        *
        * @return void
        */
        public function up()
        {
            Schema::table('task_user', function (Blueprint $table)
            {
                $table->integer('worked_duration')->default(0)->after('duration');
            });
        }

        /**
        * Reverse the migrations.
        *
        * @return void
        */
        public function down()
        {
            Schema::table('task_user', function (Blueprint $table)
            {
                $table->dropColumn('worked_duration');
            });
        }
    }
