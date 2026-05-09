<?php

declare(strict_types=1);

namespace Twigcn\Bundle\Twig\Components;

use Symfony\UX\TwigComponent\Attribute\AsTwigComponent;
use Twigcn\Bundle\Util\Cn;

#[AsTwigComponent]
final class SidebarMenuItem
{
    public string $class = '';

    public function getItemClasses(): string
    {
        return Cn::merge('sidebar-menu-item', $this->class);
    }
}
