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

/*Route::get('/', function () {
    return view('welcome');
});*/

/*Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');*/

/*Route::get('/questions', 'QuestionsController@index');*/
/*Route::get('/questions', function () {
    return view('questions.index');
});*/
/*Route::get('/questions/{id}', 'QuestionsController@show');*/


Route::group(['prefix' => 'ajax'], function () {

    // all routes that don't need to go to react-router

    /*Question*/
    Route::get("/getData", "QuestionsController@index");
    Route::post("/storeData", "QuestionsController@store");
    Route::get("/showData/{id}", "QuestionsController@show");
    Route::get("/editData/{id}", "QuestionsController@edit");
    Route::post("/updateData/{id}", "QuestionsController@update");
    Route::delete("/deleteData/{id}", "QuestionsController@destroy");
    Route::post('/upvote-question', "QuestionsController@upvoteAnswer");
    Route::post('/downvote-question', "QuestionsController@downvoteAnswer");

    /*Answer*/
    Route::post('/storeAnswer', "AnswersController@store");
    Route::post('/marked-as-best-answer', 'QuestionsController@best_answer');
    Route::post('upvote-answer', "AnswersController@upvoteAnswer");
    Route::post('downvote-answer', "AnswersController@downvoteAnswer");

});


Route::get('/{path?}', function ($path = null) {
    return view("questions.index");
})->where('path', '.*');
