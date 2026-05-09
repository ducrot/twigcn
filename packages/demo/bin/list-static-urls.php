#!/usr/bin/env php
<?php

declare(strict_types=1);

require __DIR__ . '/../vendor/autoload.php';

use App\Controller\ShowcaseController;

$baseUrl = rtrim($argv[1] ?? 'http://127.0.0.1:8000', '/');

$paths = [
    '/',
    '/getting-started',
    '/showcase',
];

foreach (ShowcaseController::COMPONENTS as $items) {
    foreach (array_keys($items) as $slug) {
        $paths[] = '/showcase/' . $slug;
    }
}

foreach ($paths as $path) {
    echo $baseUrl . $path . "\n";
}
