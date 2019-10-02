<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>Laravel</title>

    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet">
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
</head>
<body>

<div id="example"></div>


<script src="{{ asset('js/app.js') }}" defer></script>
<script>var csrf_token = '<?php echo csrf_token(); ?>'</script>
</body>
</html>


{{--
@extends('layouts.app')

@section('content')
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header">All Questions</div>

                    <div class="card-body">

                        --}}
{{-- @foreach($questions as $question)
                             <div class="media">
                                 <div class="media-body">
                                     <h3 class="mt-0"><a href="{{$question->id}}">{{$question->title}}</a></h3>
                                     <p class="lead">
                                         Asked By
                                         <a href="{{$question->user->url}}">{{$question->user->name}}</a>
                                         <small class="text-muted">{{$question->created_at->diffForHumans()}}</small>
                                     </p>
                                     {{Str::limit($question->body,250)}}
                                 </div>
                             </div>
                             <hr>
                         @endforeach

                         {{$questions->links()}}--}}{{--


                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
--}}



