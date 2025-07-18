<?php

declare(strict_types=1);

namespace HyperfTest\Testing\Concerns;

use Swoole\Coroutine;

trait CoroutineTestCase
{
    public function co(callable $callback): void
    {
        Coroutine::create($callback);
    }
}
