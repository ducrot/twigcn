<?php

declare(strict_types=1);

namespace Twigcn\Bundle\Tests\Unit\Components;

use PHPUnit\Framework\TestCase;
use Twigcn\Bundle\Twig\Components\ThemeSwitcher;

final class ThemeSwitcherTest extends TestCase
{
    public function test_default_variant_uses_btn_ghost(): void
    {
        self::assertSame('btn btn-ghost btn-icon', (new ThemeSwitcher())->getSwitcherClasses());
    }

    public function test_dropdown_variant_uses_btn_outline(): void
    {
        $switcher = new ThemeSwitcher();
        $switcher->variant = 'dropdown';

        self::assertSame('btn btn-outline btn-icon', $switcher->getSwitcherClasses());
    }

    public function test_icon_variant_uses_btn_ghost(): void
    {
        $switcher = new ThemeSwitcher();
        $switcher->variant = 'icon';

        self::assertSame('btn btn-ghost btn-icon', $switcher->getSwitcherClasses());
    }

    public function test_custom_class_is_appended(): void
    {
        $switcher = new ThemeSwitcher();
        $switcher->variant = 'dropdown';
        $switcher->class = 'ml-auto';

        self::assertSame('btn btn-outline btn-icon ml-auto', $switcher->getSwitcherClasses());
    }
}
