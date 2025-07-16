<?php
namespace App\Request;

use App\Rules\CpfOuCnpj;
use Hyperf\Validation\Request\FormRequest;

class StoreCooperadoRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'nome' => 'required|string|max:255',
            'cpf' => [
                'required',
                'string',
                new CpfOuCnpj(),
                'unique:cooperados,cpf'
            ],
            'telefone' => ['required', 'string', 'max:20', 'regex:/^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/'],
            'data_nascimento' => 'required|date',
            'renda' => 'required|numeric|min:0',
            'email' => 'nullable|email',
        ];
    }

    public function messages(): array
    {
        return [
            'cpf.required' => 'O CPF ou CNPJ é obrigatório.',
            'cpf.unique' => 'O CPF ou CNPJ informado já está em uso.',

            'email.email' => 'O e-mail deve estar em um formato válido.',
            'email.unique' => 'O e-mail informado já está em uso.',

            'nome.required' => 'O nome é obrigatório.',
            'telefone.required' => 'O telefone é obrigatório.',
            'telefone.regex' => 'O telefone informado é inválido.',
            'data_nascimento.required' => 'A data de nascimento é obrigatória.',
            'data_nascimento.date' => 'A data de nascimento deve ser uma data válida.',
        ];
    }
}
