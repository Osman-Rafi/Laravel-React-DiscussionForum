<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateQuestionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('questions', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('title');
            $table->string('slug')->unique();
            $table->text('body');
            $table->unsignedBigInteger('views')->default(rand(4,15));
            $table->unsignedBigInteger('answers')->default(rand(3,10));
            $table->integer('votes')->default(rand(1,10));
            $table->unsignedInteger('best_answer_id')->nullable();
            $table->unsignedInteger('user_id')->default(rand(1,5));
            $table->timestamps();

            /*$table->foreign('id')->references('id')->on('users')->onDelete('cascade');*/
        });
    }
    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::disableForeignKeyConstraints();
        Schema::dropIfExists('questions');
    }
}
