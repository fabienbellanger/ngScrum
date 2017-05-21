<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSprintTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('sprint', function (Blueprint $table)
        {
            $table->increments('id');
            $table->string('name', 50);
            $table->unsignedInteger('team_id');
            $table->timestamps();
            $table->dateTime('finished_at');

            $table->foreign('team_id')
                ->references('id')->on('team')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('sprint');
    }
}
