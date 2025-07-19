<?php

declare(strict_types=1);

namespace App\Exception\Handler;

use Hyperf\HttpServer\Exception\Handler\HttpExceptionHandler;
use Hyperf\Validation\ValidationException;
use Psr\Http\Message\ResponseInterface;
use Hyperf\HttpServer\Contract\ResponseInterface as HttpResponse;
use Throwable;

class ValidationExceptionHandler extends HttpExceptionHandler
{
    public function __construct(private HttpResponse $response) {}

    public function handle(Throwable $throwable, ResponseInterface $response)
    {
        if ($throwable instanceof ValidationException) {
            return $this->response->json([
                'message' => 'Os dados fornecidos são inválidos.',
                'errors' => $throwable->validator->errors(),
            ], 422);
        }
        return $response;
    }

    public function isValid(Throwable $throwable): bool
    {
        return $throwable instanceof ValidationException;
    }
}
