<?php

declare(strict_types=1);

namespace Twigcn\Bundle\Tests\Unit\Components;

use PHPUnit\Framework\TestCase;
use Twigcn\Bundle\Twig\Components\Toaster;

final class ToasterTest extends TestCase
{
    public function test_default_position_aligns_to_end(): void
    {
        self::assertSame('end', (new Toaster())->getDataAlign());
    }

    public function test_bottom_left_aligns_to_start(): void
    {
        $toaster = new Toaster();
        $toaster->position = 'bottom-left';

        self::assertSame('start', $toaster->getDataAlign());
    }

    public function test_top_left_aligns_to_start(): void
    {
        $toaster = new Toaster();
        $toaster->position = 'top-left';

        self::assertSame('start', $toaster->getDataAlign());
    }

    public function test_bottom_center_aligns_to_center(): void
    {
        $toaster = new Toaster();
        $toaster->position = 'bottom-center';

        self::assertSame('center', $toaster->getDataAlign());
    }

    public function test_top_center_aligns_to_center(): void
    {
        $toaster = new Toaster();
        $toaster->position = 'top-center';

        self::assertSame('center', $toaster->getDataAlign());
    }

    public function test_top_right_falls_through_to_end(): void
    {
        $toaster = new Toaster();
        $toaster->position = 'top-right';

        self::assertSame('end', $toaster->getDataAlign());
    }

    public function test_default_classes(): void
    {
        self::assertSame('toaster', (new Toaster())->getToasterClasses());
    }

    public function test_custom_class_is_appended(): void
    {
        $toaster = new Toaster();
        $toaster->class = 'z-50';

        self::assertSame('toaster z-50', $toaster->getToasterClasses());
    }
}
