<?php

declare(strict_types=1);

namespace Twigcn\Bundle\Twig\Components;

use Symfony\UX\TwigComponent\Attribute\AsTwigComponent;

#[AsTwigComponent]
final class Sidebar
{
    public string $side = 'left';
    public bool $collapsible = false;
    public string $class = '';

    public function getSidebarClasses(): string
    {
        $classes = ['sidebar'];

        if ($this->side !== 'left') {
            $classes[] = 'sidebar-' . $this->side;
        }

        if ($this->collapsible) {
            $classes[] = 'sidebar-collapsible';
        }

        if ($this->class !== '') {
            $classes[] = $this->class;
        }

        return implode(' ', $classes);
    }
}
