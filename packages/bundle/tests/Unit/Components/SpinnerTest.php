<?php

declare(strict_types=1);

namespace Twigcn\Bundle\Tests\Unit\Components;

use PHPUnit\Framework\TestCase;
use Twigcn\Bundle\Twig\Components\Spinner;

final class SpinnerTest extends TestCase
{
    public function test_default_size_uses_size_6(): void
    {
        self::assertSame('animate-spin size-6', (new Spinner())->getSpinnerClasses());
    }

    public function test_small_size_uses_size_4(): void
    {
        $spinner = new Spinner();
        $spinner->size = 'sm';

        self::assertSame('animate-spin size-4', $spinner->getSpinnerClasses());
    }

    public function test_large_size_uses_size_8(): void
    {
        $spinner = new Spinner();
        $spinner->size = 'lg';

        self::assertSame('animate-spin size-8', $spinner->getSpinnerClasses());
    }

    public function test_unknown_size_falls_back_to_size_6(): void
    {
        $spinner = new Spinner();
        $spinner->size = 'gigantic';

        self::assertSame('animate-spin size-6', $spinner->getSpinnerClasses());
    }

    public function test_custom_class_is_appended(): void
    {
        $spinner = new Spinner();
        $spinner->class = 'text-primary';

        self::assertSame('animate-spin size-6 text-primary', $spinner->getSpinnerClasses());
    }
}
