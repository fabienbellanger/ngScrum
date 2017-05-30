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
    });
