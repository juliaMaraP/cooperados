<?php

declare(strict_types=1);

namespace App\Exception\Handler;

use Hyperf\ExceptionHandler\ExceptionHandler;
use Hyperf\HttpMessage\Stream\SwooleStream;
use Hyperf\Validation\ValidationException;
use Psr\Http\Message\ResponseInterface;
use Throwable;

class AppExceptionHandler extends ExceptionHandler
{
    public function handle(Throwable $throwable, ResponseInterface $response): ResponseInterface
    {
        if ($throwable instanceof ValidationException) {
            return $response
                ->withStatus(422)
                ->withHeader('Content-Type', 'application/json')
                ->withBody(new SwooleStream(json_encode([
                    'message' => $throwable->getMessage(),
                    'errors' => $throwable->validator->errors(),
                ])));
        }

        return $response
            ->withStatus(500)
            ->withHeader('Content-Type', 'application/json')
            ->withBody(new SwooleStream(json_encode([
                'message' => 'Internal Server Error',
            ])));
    }

    public function isValid(Throwable $throwable): bool
    {
        return true;
    }
}
