<?php

    /*
    |--------------------------------------------------------------------------
    | Sprint Routes
    |--------------------------------------------------------------------------
    |
    */

    Route::group(['prefix' => 'sprints'], function()
    {
        Route::get('/', 'SprintController@getAllSprints')
             ->where([
                         'id' => '[0-9]+',
                     ]);
        Route::get('/{state}', 'SprintController@getSprints')
             ->where([
                         'id'    => '[0-9]+',
                         'state' => '(all|inProgress|finished)',
                     ]);
        Route::get('/{sprintId}', 'SprintController@getSprintInfo')
             ->where([
                         'id'       => '[0-9]+',
                         'sprintId' => '[0-9]+',
                     ]);

        Route::group(['prefix' => '{sprintId}/tasks'], function()
        {
            Route::post('/', 'SprintController@addTask')
                ->where([
                            'id'       => '[0-9]+',
                            'sprintId' => '[0-9]+',
                        ]);

            Route::delete('/{taskId}', 'SprintController@deleteTask')
                ->where([
                            'id'       => '[0-9]+',
                            'sprintId' => '[0-9]+',
                            'taskId'   => '[0-9]+',
                        ]);
        });
    });
