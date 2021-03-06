<?php

namespace App\Http\Controllers;

use App\Answer;
use Illuminate\Http\Request;

class AnswersController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $answer = new Answer;

        $answer->body = $request->answer;
        $answer->question_id = $request->question_id;

        $answer->save();
        return $answer;
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    public function upvoteAnswer(Request $request)
    {
        $answer = Answer::find($request->ans_id);
        $data = $answer->votes_count;
        $data += 1;
        $answer->votes_count = $data;
        $answer->save();

        return $answer->votes_count;
    }

    public function downvoteAnswer(Request $request)
    {
        $answer = Answer::find($request->ans_id);
        $data = $answer->votes_count;
        $data -= 1;
        $answer->votes_count = $data;
        $answer->save();

        return $answer->votes_count;
    }
}
