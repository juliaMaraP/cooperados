<?php

declare(strict_types=1);

namespace App\Validation;

use Hyperf\Context\ApplicationContext;
use Hyperf\Validation\Contract\ValidatorFactoryInterface;

class ValidatorProvider
{
    public function __construct()
    {
        $this->registerCustomRules();
    }

    protected function registerCustomRules(): void
    {
        $factory = ApplicationContext::getContainer()->get(ValidatorFactoryInterface::class);

        $factory->extend('cpf_ou_cnpj', function ($attribute, $value, $parameters, $validator) {
            $value = preg_replace('/\D/', '', $value);
            return strlen($value) === 11 || strlen($value) === 14;
        }, 'O campo :attribute deve ser um CPF ou CNPJ válido.');

        $factory->extend('telefone', function ($attribute, $value, $parameters, $validator) {
            return preg_match('/^\(?\d{2}\)?[\s-]?\d{4,5}-?\d{4}$/', $value);
        }, 'O campo :attribute deve ser um telefone válido.');
    }
}
