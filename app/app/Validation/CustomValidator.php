<?php

namespace App\Validation;

class CustomValidator
{
    public function validateCpfOuCnpj($attribute, $value, $parameters, $validator)
    {
        $value = preg_replace('/\D/', '', $value); // remove tudo que não é número

        return $this->isValidCpf($value) || $this->isValidCnpj($value);
    }

    protected function isValidCpf($cpf)
    {
        if (strlen($cpf) != 11 || preg_match('/(\d)\1{10}/', $cpf)) return false;

        for ($t = 9; $t < 11; $t++) {
            for ($d = 0, $c = 0; $c < $t; $c++) {
                $d += $cpf[$c] * (($t + 1) - $c);
            }
            $d = ((10 * $d) % 11) % 10;
            if ($cpf[$c] != $d) return false;
        }

        return true;
    }

    protected function isValidCnpj($cnpj)
    {
        if (strlen($cnpj) != 14) return false;

        if (preg_match('/(\d)\1{13}/', $cnpj)) return false;

        for ($t = 12; $t < 14; $t++) {
            for ($d = 0, $p = 0, $c = 0; $c < $t; $c++) {
                $p = ($c < ($t - 8)) ? $c + 1 : $c - 7;
                $d += $cnpj[$c] * $p;
            }

            $d = ((10 * $d) % 11) % 10;

            if ($cnpj[$c] != $d) return false;
        }

        return true;
    }
}
