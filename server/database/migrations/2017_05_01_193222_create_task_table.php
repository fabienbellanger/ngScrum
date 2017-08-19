<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTaskTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('task', function (Blueprint $table)
        {
            $table->increments('id');
            $table->unsignedInteger('sprint_id');
            $table->unsignedInteger('user_id');
            $table->string('name', 100);
            $table->text('description')->nullable();
            $table->decimal('initial_duration', 10, 2)->default(0);
            $table->decimal('remaining_duration', 10, 2)->default(0);
            $table->timestamps();
            $table->date('finished_at')->nullable();

            $table->foreign('sprint_id')
                ->references('id')->on('sprint')
                ->onDelete('cascade');
            $table->foreign('user_id')
                ->references('id')->on('users')
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
        Schema::dropIfExists('task');
    }
}
