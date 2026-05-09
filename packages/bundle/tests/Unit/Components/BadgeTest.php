<?php

declare(strict_types=1);

namespace Twigcn\Bundle\Tests\Unit\Components;

use PHPUnit\Framework\TestCase;
use Twigcn\Bundle\Twig\Components\Badge;

final class BadgeTest extends TestCase
{
    public function test_default_variant_returns_badge(): void
    {
        self::assertSame('badge', (new Badge())->getBadgeClasses());
    }

    public function test_secondary_variant(): void
    {
        $badge = new Badge();
        $badge->variant = 'secondary';

        self::assertSame('badge-secondary', $badge->getBadgeClasses());
    }

    public function test_destructive_variant(): void
    {
        $badge = new Badge();
        $badge->variant = 'destructive';

        self::assertSame('badge-destructive', $badge->getBadgeClasses());
    }

    public function test_outline_variant(): void
    {
        $badge = new Badge();
        $badge->variant = 'outline';

        self::assertSame('badge-outline', $badge->getBadgeClasses());
    }

    public function test_unknown_variant_falls_back_to_badge(): void
    {
        $badge = new Badge();
        $badge->variant = 'mystery';

        self::assertSame('badge', $badge->getBadgeClasses());
    }

    public function test_custom_class_is_appended(): void
    {
        $badge = new Badge();
        $badge->variant = 'secondary';
        $badge->class = 'ml-2';

        self::assertSame('badge-secondary ml-2', $badge->getBadgeClasses());
    }
}
