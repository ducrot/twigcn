<?php

declare(strict_types=1);

namespace Twigcn\Bundle\Twig\Components;

use Symfony\UX\TwigComponent\Attribute\AsTwigComponent;
use Twigcn\Bundle\Util\Cn;

#[AsTwigComponent]
final class ThemeSwitcher
{
    public string $variant = 'icon';
    public string $class = '';

    public function getSwitcherClasses(): string
    {
        return Cn::merge('theme-switcher', $this->class);
    }
}
