<?php

    use Illuminate\Database\Migrations\Migration;
    use Illuminate\Database\Schema\Blueprint;
    use Illuminate\Support\Facades\Schema;

    class AddTaskAddedAfterTaskTable extends Migration
    {
        /**
         * Run the migrations.
         *
         * @return void
         */
        public function up()
        {
            Schema::table('task', function(Blueprint $table)
            {
                $table->boolean('added_after')->default(false)->after('remaining_duration');
            });
        }

        /**
         * Reverse the migrations.
         *
         * @return void
         */
        public function down()
        {
            Schema::table('task', function(Blueprint $table)
            {
                $table->dropColumn('added_after');
            });
        }
    }
