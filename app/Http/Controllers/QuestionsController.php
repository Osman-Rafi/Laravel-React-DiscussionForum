<?php

namespace App\Http\Controllers;

use App\Question;
use App\Answer;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class QuestionsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $questions_latest = Question::with("user")->latest()->get();
        $question_popular = Question::with("user")->orderBy('votes', 'desc')->get();
        return [$questions_latest, $question_popular];
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $question = new Question();

        $question->title = $request->get('title');
        $question->body = $request->get('body');


        $question->save();

        return $question;

    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {

        $question = Question::with('answers.user')->where('id', $id)->first();

        return $question;

    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $question = Question::find($id);

        return $question;
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
        $question = Question::find($id);

        $question->title = $request->get('title');
        $question->body = $request->get('body');


        $question->save();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $question = Question::find($id);
        $question->delete();

        return "success !!";
    }

    public function best_answer(Request $request)
    {

        $question = Question::find($request->question_id);
        $question->best_answer_id = $request->ans_id;

        $question->save();
        return $question->best_answer_id;

    }

    public function upvoteAnswer(Request $request)
    {
        $question = Question::find($request->question_id);
        $data = $question->votes;
        $data += 1;
        $question->votes = $data;
        $question->save();

        return $data;
    }

    public function downvoteAnswer(Request $request)
    {
        $question = Question::find($request->question_id);
        $data = $question->votes;
        $data -= 1;
        $question->votes = $data;
        $question->save();

        return $data;
    }
}
