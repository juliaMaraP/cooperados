<?php

declare(strict_types=1);

namespace App\Model;

use Hyperf\DbConnection\Model\Model;

class Cooperado extends Model
{
    protected ?string $table = 'cooperados'; 

    protected array $fillable = [             
        'nome',
        'email',
        'telefone',
        'cpf',
        'data_nascimento',
        'renda',
    ];
    

 
}
      