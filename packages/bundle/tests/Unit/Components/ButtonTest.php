<?php

declare(strict_types=1);

namespace Twigcn\Bundle\Tests\Unit\Components;

use PHPUnit\Framework\TestCase;
use Twigcn\Bundle\Twig\Components\Button;

final class ButtonTest extends TestCase
{
    public function test_default_button_uses_btn(): void
    {
        self::assertSame('btn', (new Button())->getButtonClasses());
    }

    public function test_size_only(): void
    {
        $btn = new Button();
        $btn->size = 'lg';

        self::assertSame('btn-lg', $btn->getButtonClasses());
    }

    public function test_size_and_variant_compose_in_order(): void
    {
        $btn = new Button();
        $btn->size = 'lg';
        $btn->variant = 'destructive';

        self::assertSame('btn-lg-destructive', $btn->getButtonClasses());
    }

    public function test_icon_only(): void
    {
        $btn = new Button();
        $btn->iconOnly = true;

        self::assertSame('btn-icon', $btn->getButtonClasses());
    }

    public function test_size_and_icon_only(): void
    {
        $btn = new Button();
        $btn->size = 'sm';
        $btn->iconOnly = true;

        self::assertSame('btn-sm-icon', $btn->getButtonClasses());
    }

    public function test_icon_only_and_variant(): void
    {
        $btn = new Button();
        $btn->iconOnly = true;
        $btn->variant = 'outline';

        self::assertSame('btn-icon-outline', $btn->getButtonClasses());
    }

    public function test_size_icon_only_and_variant(): void
    {
        $btn = new Button();
        $btn->size = 'sm';
        $btn->iconOnly = true;
        $btn->variant = 'outline';

        self::assertSame('btn-sm-icon-outline', $btn->getButtonClasses());
    }

    public function test_custom_class_is_appended(): void
    {
        $btn = new Button();
        $btn->class = 'extra-class';

        self::assertSame('btn extra-class', $btn->getButtonClasses());
    }
}
