<?php
namespace App\Request;

use App\Rules\CpfOuCnpj;
use Hyperf\Validation\Request\FormRequest;
use Hyperf\Validation\Rule;

class StoreCooperadoRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $id = $this->route('id'); 

        $cpfRule = [
            'required',
            'string',
            new CpfOuCnpj(),
            Rule::unique('cooperados', 'cpf')
                ->ignore($id) 
        ];

        $emailRule = [
            'nullable',
            'email',
            Rule::unique('cooperados', 'email')
                ->ignore($id)
        ];

        return [
            'nome' => 'required|string|max:255',
            'cpf' => $cpfRule,
            'telefone' => ['required', 'string', 'max:20', 'regex:/^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/'],
            'data_nascimento' => 'required|date_format:Y-m-d|date',
            'renda' => 'required|numeric|min:0',
            'email' => $emailRule,
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
            'data_nascimento.date_format' => 'A data de nascimento deve estar no formato YYYY-MM-DD.',
            'data_nascimento.date' => 'A data de nascimento deve ser uma data válida.',
            'data_nascimento.required' => 'A data de nascimento é obrigatória.',
        ];
    }
}
