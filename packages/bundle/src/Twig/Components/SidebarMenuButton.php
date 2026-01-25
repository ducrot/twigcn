<?php

declare(strict_types=1);

namespace Twigcn\Bundle\Twig\Components;

use Symfony\UX\TwigComponent\Attribute\AsTwigComponent;

#[AsTwigComponent]
final class SidebarMenuButton
{
    public string $href = '';
    public bool $active = false;
    public string $class = '';

    public function getButtonClasses(): string
    {
        $classes = ['sidebar-menu-button'];

        if ($this->active) {
            $classes[] = 'active';
        }

        if ($this->class !== '') {
            $classes[] = $this->class;
        }

        return implode(' ', $classes);
    }
}
