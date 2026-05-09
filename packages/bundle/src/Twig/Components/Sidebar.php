<?php

declare(strict_types=1);

namespace Twigcn\Bundle\Twig\Components;

use Symfony\UX\TwigComponent\Attribute\AsTwigComponent;
use Twigcn\Bundle\Util\Cn;

#[AsTwigComponent]
final class Sidebar
{
    public string $side = 'left';
    public bool $collapsible = false;
    public string $class = '';

    public function getSidebarClasses(): string
    {
        return Cn::merge(
            'sidebar',
            $this->side !== 'left' ? 'sidebar-' . $this->side : null,
            $this->collapsible ? 'sidebar-collapsible' : null,
            $this->class,
        );
    }
}
