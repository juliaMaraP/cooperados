<?php

declare(strict_types=1);

namespace App\Controller;

use App\Model\Cooperado;
use App\Request\StoreCooperadoRequest;
use Hyperf\HttpServer\Annotation\Controller;
use Hyperf\HttpServer\Annotation\GetMapping;
use Hyperf\HttpServer\Annotation\PostMapping;
use Hyperf\HttpServer\Annotation\PutMapping;
use Hyperf\HttpServer\Annotation\DeleteMapping;
use Hyperf\HttpServer\Contract\RequestInterface;
use Psr\Http\Message\ResponseInterface;
use Hyperf\HttpServer\Contract\ResponseInterface as HttpResponse;

#[Controller(prefix: "cooperados")]
class CooperadoController
{
    public function __construct(private HttpResponse $response) {}

    #[GetMapping(path: "")]
    public function index(): ResponseInterface
    {
        return $this->response->json(Cooperado::all());
    }

    #[GetMapping(path: "{id}")]
    public function show(int $id): ResponseInterface
    {
        $cooperado = Cooperado::find($id);
        if (! $cooperado) {
            return $this->response->json(['message' => 'Cooperado não encontrado'], 404);
        }

        return $this->response->json($cooperado);
    }

    #[PostMapping(path: "")]
    public function store(StoreCooperadoRequest $request): ResponseInterface
    {
        $data = $request->validated();
       
        $existing = Cooperado::where('cpf', $data['cpf'])->first();
        if ($existing) {
            return $this->response->json([
                'message' => 'Cooperado já cadastrado com este CPF/CNPJ.',
            ])->withStatus(409);
        }

        $cooperado = Cooperado::create($data);

        return $this->response->json($cooperado)->withStatus(201);
    }

    #[PutMapping(path: "{id}")]
    public function update(int $id, StoreCooperadoRequest $request): ResponseInterface
    {

        $cooperado = Cooperado::find($id);
        if (! $cooperado) {
            return $this->response->json(['message' => 'Cooperado não encontrado'], 404);
        }

        $data = $request->validated();

       
        if (isset($data['cpf']) && $data['cpf'] !== $cooperado->cpf) {
        $exists = Cooperado::where('cpf', $data['cpf'])->first();
        if ($exists) {
            return $this->response->json([
                'message' => 'Já existe outro cooperado com este CPF.',
            ])->withStatus(409);
        }
    }
        $cooperado->update($data);

        return $this->response->json($cooperado);
    }

    #[DeleteMapping(path: "{id}")]
    public function destroy(int $id): ResponseInterface
    {
        $cooperado = Cooperado::find($id);
        if (! $cooperado) {
            return $this->response->json(['message' => 'Cooperado não encontrado'], 404);
        }

        $cooperado->delete();

        return $this->response->json(['message' => 'Cooperado deletado com sucesso.']);
    }
}