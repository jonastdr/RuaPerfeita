<?php

namespace App\Http\Controllers;

use App\Resposta;
use Illuminate\Http\Request;

use App\Http\Requests;

class RespostaController extends Controller
{
    public function index() {
        $respostas = Resposta::all();
        return $respostas;
    }

    public function store(Request $request) {
        $rules = array(
            'obs' => 'required'
        );

        $this->validate($request, $rules);

        $resposta = new Resposta();
        $resposta->create($request);
    }

    public function update($id, Request $request) {
        $resposta = Resposta::findOrFail($id);

        $this->validate($request, [
            'obs' => 'required'
        ]);

        $input = $request->all();

        $resposta->fill($input)->save();
    }
}
