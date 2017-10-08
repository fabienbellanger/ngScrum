<?php

    /*
    |--------------------------------------------------------------------------
    | Statistics Routes
    |--------------------------------------------------------------------------
    |
    */

    Route::group(['prefix' => 'statistics'], function()
    {
        Route::get('/cir/{year?}', 'StatisticsController@getCIR')
            ->where([
                        'year' => '[12]\d{3}',
                    ]);
    });
