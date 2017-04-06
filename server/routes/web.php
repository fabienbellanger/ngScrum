<?php

    /*
    |--------------------------------------------------------------------------
    | Web Routes
    |--------------------------------------------------------------------------
    |
    | Here is where you can register web routes for your application. These
    | routes are loaded by the RouteServiceProvider within a group which
    | contains the "web" middleware group. Now create something great!
    |
    */

    Route::group(['prefix' => 'v1'], function()
    {
        // ----------------
        // Authentification
        // ----------------
        Route::post('login', 'AuthenticateController@login');

        // ----------------
        // Routes protégées
        // ----------------
        Route::group(['middleware' => 'jwt.auth'], function()
        {
            // Logout
            // ------
            Route::get('logout', 'AuthenticateController@logout');

            // Page de test
            // ------------
            Route::get('test', function()
            {
                return Response::json(['data' => 'Test'], 200);
            });
        });
    });
