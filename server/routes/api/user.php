<?php

    /*
    |--------------------------------------------------------------------------
    | User Routes
    |--------------------------------------------------------------------------
    |
    */

    Route::group(['prefix' => 'users/{id}'], function()
    {
        // Team
        // ----
        Route::get('/teams', 'UserController@getTeams')->where('id', '[0-9]+');

        // Sprints
        // -------
        Route::get('/sprints', 'UserController@getAllSprints')
             ->where([
                         'id'    => '[0-9]+',
                     ]);
        Route::get('/sprints/{state}', 'UserController@getSprints')
             ->where([
                         'id'    => '[0-9]+',
                         'state' => '(all|inProgress|finished)',
                     ]);
    });
