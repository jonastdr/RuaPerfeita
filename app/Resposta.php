<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Resposta extends Model
{
    public $table = 'resposta';
    public $primaryKey = 'id_resposta';

    public $fillable = ['status', 'obs', 'orgao'];
}
