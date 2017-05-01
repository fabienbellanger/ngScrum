<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTaskApplicationTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('task_application', function (Blueprint $table)
        {
            $table->unsignedInteger('task_id');
            $table->unsignedInteger('application_id');

            $table->primary(['task_id', 'application_id']);

            $table->foreign('task_id')
                ->references('id')->on('task')
                ->onDelete('cascade');
            $table->foreign('application_id')
                ->references('id')->on('application')
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
        Schema::dropIfExists('task_application');
    }
}
