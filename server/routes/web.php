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

        // -------------------
        // Mot de passe oublié
        // -------------------
        Route::post('forgotten-password', 'AuthenticateController@forgottenPassword');

        // ----------------
        // Routes protégées
        // ----------------
        Route::group(['middleware' => 'jwt.auth'], function()
        {
            // Logout
            // ------
            Route::get('logout', 'AuthenticateController@logout');

            // Test du token
            // -------------
            Route::get('check-token', function()
            {
                return Response::json(['tokenValid' => true], 200);
            });

            // User
            // ----
            include_once('api/user.php');
        });
    });
