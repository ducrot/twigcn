<?php

declare(strict_types=1);

namespace Twigcn\Bundle\Tests\Unit\Components;

use PHPUnit\Framework\TestCase;
use Twigcn\Bundle\Twig\Components\Progress;

final class ProgressTest extends TestCase
{
    public function test_default_value_is_zero_percent(): void
    {
        self::assertSame(0, (new Progress())->getPercentage());
    }

    public function test_full_value_is_one_hundred_percent(): void
    {
        $progress = new Progress();
        $progress->value = 100;

        self::assertSame(100, $progress->getPercentage());
    }

    public function test_normal_interpolation(): void
    {
        $progress = new Progress();
        $progress->value = 25;

        self::assertSame(25, $progress->getPercentage());
    }

    public function test_value_above_max_clamps_to_one_hundred(): void
    {
        $progress = new Progress();
        $progress->value = 250;

        self::assertSame(100, $progress->getPercentage());
    }

    public function test_max_zero_returns_zero(): void
    {
        $progress = new Progress();
        $progress->value = 50;
        $progress->max = 0;

        self::assertSame(0, $progress->getPercentage());
    }

    public function test_negative_max_returns_zero(): void
    {
        $progress = new Progress();
        $progress->value = 50;
        $progress->max = -10;

        self::assertSame(0, $progress->getPercentage());
    }

    public function test_negative_value_clamps_to_zero(): void
    {
        $progress = new Progress();
        $progress->value = -10;

        self::assertSame(0, $progress->getPercentage());
    }

    public function test_custom_max(): void
    {
        $progress = new Progress();
        $progress->value = 5;
        $progress->max = 20;

        self::assertSame(25, $progress->getPercentage());
    }
}
