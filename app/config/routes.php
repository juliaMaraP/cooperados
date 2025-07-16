<?php

declare(strict_types=1);

use Hyperf\HttpServer\Router\Router;
use App\Controller\CooperadoController;

Router::get('/cooperados', [CooperadoController::class, 'index']);
Router::get('/cooperados/{id}', [CooperadoController::class, 'show']);
Router::post('/cooperados', [CooperadoController::class, 'store']);
Router::put('/cooperados/{id}', [CooperadoController::class, 'update']);
Router::delete('/cooperados/{id}', [CooperadoController::class, 'destroy']);
