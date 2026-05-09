<?php

declare(strict_types=1);

namespace Twigcn\Bundle\Util;

final class Cn
{
    public static function merge(?string ...$parts): string
    {
        return implode(' ', array_filter(
            $parts,
            static fn (?string $part): bool => $part !== null && $part !== '',
        ));
    }
}
