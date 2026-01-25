<?php

declare(strict_types=1);

namespace Twigcn\Bundle\Twig\Components;

use Symfony\UX\TwigComponent\Attribute\AsTwigComponent;

#[AsTwigComponent]
final class ThemeSwitcher
{
    public string $variant = 'icon';
    public string $class = '';

    public function getSwitcherClasses(): string
    {
        $classes = ['theme-switcher'];

        if ($this->class !== '') {
            $classes[] = $this->class;
        }

        return implode(' ', $classes);
    }
}
