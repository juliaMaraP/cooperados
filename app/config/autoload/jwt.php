<?php

declare(strict_types=1);

return [
    'no_check_route' => [
        ['POST', '/login'],
        ['POST', '/register'],
    ],

    'login_type' => env('JWT_LOGIN_TYPE', 'mpop'),

    'sso_key' => 'uid',

    'secret' => env('JWT_SECRET', 'supersecretunicredjwtkey2025'),

    'keys' => [
        'public' => env('JWT_PUBLIC_KEY'),
        'private' => env('JWT_PRIVATE_KEY'),
        'passphrase' => env('JWT_PASSPHRASE'),
    ],

    'ttl' => env('JWT_TTL', 3600), // 1 hora

    'alg' => env('JWT_ALG', 'HS256'),

    'cache_prefix' => 'phper666:jwt',

    'blacklist_enabled' => env('JWT_BLACKLIST_ENABLED', true),

    'blacklist_grace_period' => env('JWT_BLACKLIST_GRACE_PERIOD', 0),

    'issued_by' => 'unicred-hyperf-api',

    'scene' => [
        'default' => [],
        'application' => [
            'secret' => 'applicationsecretkeyunicred',
            'login_type' => 'sso',
            'sso_key' => 'uid',
            'ttl' => 3600,
        ]
    ]
];
