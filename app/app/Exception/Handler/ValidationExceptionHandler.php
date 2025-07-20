<?php

declare(strict_types=1);

namespace App\Exception\Handler;

use Hyperf\Validation\ValidationException;
use Hyperf\ExceptionHandler\ExceptionHandler;
use Hyperf\HttpServer\Contract\ResponseInterface as HttpResponse;
use Psr\Http\Message\ResponseInterface;
use Throwable;

class ValidationExceptionHandler extends ExceptionHandler
{
    public function __construct(private HttpResponse $response) {}

    public function handle(Throwable $throwable, ResponseInterface $response)
    {
        $this->stopPropagation();

        if ($throwable instanceof ValidationException) {
            return $this->response
                ->withHeader('Content-Type', 'application/json; charset=utf-8')
                ->withHeader('Access-Control-Allow-Origin', '*')
                ->withHeader('Access-Control-Allow-Headers', '*')
                ->json([
                    'message' => 'Erro de validação nos dados enviados.',
                    'errors' => $throwable->validator->errors()->messages(),
                ])
                ->withStatus(422);
        }

        return $this->response
            ->json(['message' => 'Erro interno.'])
            ->withStatus(500);
    }

    public function isValid(Throwable $throwable): bool
    {
        return $throwable instanceof ValidationException;
    }
}
