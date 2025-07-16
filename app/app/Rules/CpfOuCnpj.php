<?php

namespace App\Rules;

use Bissolli\ValidadorCpfCnpj\CPF;
use Bissolli\ValidadorCpfCnpj\CNPJ;
use Hyperf\Validation\Contract\Rule;

class CpfOuCnpj implements Rule
{
    public function passes($attribute, $value): bool
    {
        $cpf = new CPF($value);
        $cnpj = new CNPJ($value);

        return $cpf->isValid() || $cnpj->isValid();
    }

    public function message(): string
    {
        return 'O campo CPF ou CNPJ é inválido.';
    }
}
