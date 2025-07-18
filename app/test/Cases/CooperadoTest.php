<?php

declare(strict_types=1);

namespace HyperfTest\Cases;

use Hyperf\Testing\Client;
use Hyperf\Testing\TestCase;
use function Hyperf\Coroutine\run;

class CooperadoTest extends TestCase
{
    private static int $cooperadoId;
    public function testListarCooperadosRetorna200(): void
    {
        run(function () {
            $response = $this->get('/cooperados');
            $this->assertSame(200, $response->getStatusCode());

            echo "\nteste listagem de cooperados ok\n";
        });
    }

    public function testCriarCooperado(): void
    {
        run(function () {
            $payload = [
                'nome' => 'Teste da Julia2',
                'cpf' => '67675667050',
                'data_nascimento' => '1990-01-01',
                'renda' => 5000,
                'telefone' => '11999999945',
                'email' => 'teste1@example.com',
            ];

            $response = $this->post('/cooperados', $payload);
            $this->assertSame(201, $response->getStatusCode());

            $json = $response->getBody()->getContents();
            $data = json_decode($json, true);
            self::$cooperadoId = $data['id'] ?? null;

            echo "\nteste de criação de cooperado ok. Id: " . self::$cooperadoId . "\n";
        });
    }

    public function testExcluirCooperado(): void
    {
        run(function () {
            $id = self::$cooperadoId;

            $response = $this->delete("/cooperados/{$id}");
            $this->assertSame(200, $response->getStatusCode());

            echo "\nteste de exclusão de cooperado ok\n";
        });
    }
}
