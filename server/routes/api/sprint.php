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
        Route::get('/{sprintId}/management/{date?}', 'SprintController@getSprintManagement')
             ->where([
                         'id'       => '[0-9]+',
                         'sprintId' => '[0-9]+',
                     ]);
        Route::get('/{sprintId}/parameters', 'SprintController@getSprintParameters')
             ->where([
                         'id'       => '[0-9]+',
                         'sprintId' => '[0-9]+',
                     ]);
        Route::put('/{sprintId}/parameters', 'SprintController@modifySprintParameters')
             ->where([
                         'id'       => '[0-9]+',
                         'sprintId' => '[0-9]+',
                     ]);

        /*
        |----------------------------------------------------------------------
        | Task Routes
        |----------------------------------------------------------------------
        |
        */
        Route::group(['prefix' => '{sprintId}/tasks'], function()
        {
            Route::get('/{taskId}', 'SprintController@getTask')
                ->where([
                            'id'       => '[0-9]+',
                            'sprintId' => '[0-9]+',
                            'taskId'   => '[0-9]+',
                        ]);

            Route::post('/', 'SprintController@addTask')
                ->where([
                            'id'       => '[0-9]+',
                            'sprintId' => '[0-9]+',
                        ]);

            Route::put('/{taskId}', 'SprintController@modifyTask')
                ->where([
                            'id'       => '[0-9]+',
                            'sprintId' => '[0-9]+',
                            'taskId'   => '[0-9]+',
                        ]);

            Route::delete('/{taskId}', 'SprintController@deleteTask')
                ->where([
                            'id'       => '[0-9]+',
                            'sprintId' => '[0-9]+',
                            'taskId'   => '[0-9]+',
                        ]);

            Route::put('/{taskId}/task-user', 'SprintController@editTaskUser')
                 ->where([
                             'id'       => '[0-9]+',
                             'sprintId' => '[0-9]+',
                             'taskId'   => '[0-9]+',
                         ]);

            Route::post('/{taskId}/task-user', 'SprintController@editTaskUser')
                 ->where([
                             'id'       => '[0-9]+',
                             'sprintId' => '[0-9]+',
                             'taskId'   => '[0-9]+',
                         ]);
        });
    });
