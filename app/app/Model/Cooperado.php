<?php

declare(strict_types=1);

namespace App\Model;

use Hyperf\DbConnection\Model\Model;

class Cooperado extends Model
{
    protected ?string $table = 'cooperados'; // <- tipo correto

    protected array $fillable = [             // <- tipo correto
        'nome',
        'email',
        'telefone',
        'cpf',
        'data_nascimento',
        'renda',
    ];
    

    //public $timestamps = false;
}
      