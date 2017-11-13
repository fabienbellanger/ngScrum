<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddDeletedAtTeamTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('team', function (Blueprint $table)
        {
            $table->timestamp('deleted_at')->nullable();

            $table->index('deleted_at');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('team', function (Blueprint $table)
        {
            $table->dropIndex('team_deleted_at_index');

            $table->dropColumn('deleted_at');
        });
    }
}
