<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateRespostaTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('resposta', function(Blueprint $table) {
            $table->increments('id_resposta');
            $table->boolean('status');
            $table->string('obs');
            $table->string('orgao');
            $table->timestamps();
            $table->integer('id_pin')->unsigned();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('resposta');
    }
}
