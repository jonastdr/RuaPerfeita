<?php

namespace App\Http\Controllers;

use App\Pin;
use Carbon\Carbon;
use Illuminate\Http\Request;

use App\Http\Requests;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Validator;

class PinController extends Controller
{
    public function index() {
        $pin = new Pin();
        return $pin->where('expire_at', '>', Carbon::now()->toDateString())->orWhere('voto', '>', 2)->get();

    }

    public function store(Request $request) {

        $rules = array(
            'lat' => 'required',
            'long' => 'required',
            'tipo' => 'required',
        );

        $this->validate($request, $rules);

        $pin = new Pin();
        $post = $request->all();
        $post['expire_at'] = Carbon::now()->addDay(30)->toDateTimeString();
        $newPin = $pin->create($post);

        return $newPin;
    }

    public function update($id, Request $request)
    {
        $pin = new Pin();
        if($request->voto > 0 ){
            $pin->find($id)->increment('voto');
        }elseif($request->voto < 0){
            $pin->find($id)->decrement('voto');
        }
        return 'Sucesso';
    }
}
