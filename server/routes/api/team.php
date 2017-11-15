<?php

    /*
    |--------------------------------------------------------------------------
    | Team Routes
    |--------------------------------------------------------------------------
    |
    */

    Route::group(['prefix' => 'teams'], function()
    {
        Route::get('', 'TeamController@getTeams');

        Route::delete('/{teamId}', 'TeamController@deleteTeam')
            ->where(['teamId' => '[0-9]+']);

        Route::get('/edit/{teamId?}', 'TeamController@getTeamEdit')
            ->where(['teamId' => '[0-9]+']);

        Route::post('', 'TeamController@editTeam');
        
        Route::put('/{teamId}', 'TeamController@editTeam')
            ->where(['teamId' => '[0-9]+']);
    });
