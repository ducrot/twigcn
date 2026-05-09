<?php

declare(strict_types=1);

namespace Twigcn\Bundle\Tests\Unit\Util;

use PHPUnit\Framework\TestCase;
use Twigcn\Bundle\Util\Cn;

final class CnTest extends TestCase
{
    public function test_joins_two_parts_with_space(): void
    {
        self::assertSame('a b', Cn::merge('a', 'b'));
    }

    public function test_filters_null_parts(): void
    {
        self::assertSame('a b', Cn::merge('a', null, 'b'));
    }

    public function test_filters_empty_string_parts(): void
    {
        self::assertSame('a b', Cn::merge('a', '', 'b'));
    }

    public function test_returns_empty_string_when_called_without_arguments(): void
    {
        self::assertSame('', Cn::merge());
    }

    public function test_returns_single_part_unchanged(): void
    {
        self::assertSame('a', Cn::merge('a'));
    }

    public function test_returns_empty_string_when_all_parts_are_empty(): void
    {
        self::assertSame('', Cn::merge(null, '', null));
    }
}
