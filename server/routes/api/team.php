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
    });
