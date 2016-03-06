<?php

/*
|--------------------------------------------------------------------------
| Routes File
|--------------------------------------------------------------------------
|
| Here is where you will register all of the routes in an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', function () {
    return view('index');
});

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| This route group applies the "web" middleware group to every route
| it contains. The "web" middleware group is defined in your HTTP
| kernel and includes session state, CSRF protection, and more.
|
*/

//App::before(function($request)
//{
//    // Sent by the browser since request come in as cross-site AJAX
//    // The cross-site headers are sent via .htaccess
//    if ($request->getMethod() == "OPTIONS")
//        return new SuccessResponse();
//});

header('Access-Control-Allow-Origin: *');
//header('Access-Control-Allow-Credentials: false');

Route::group(['middleware' => 'cors'], function () {
});

Route::resource('pin', 'PinController', ['only' => ['index', 'store', 'update']]);
Route::resource('resposta', 'RespostaController', ['only' => ['index', 'store', 'update']]);
