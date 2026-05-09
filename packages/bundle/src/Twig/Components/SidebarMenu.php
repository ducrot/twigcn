<?php

declare(strict_types=1);

namespace Twigcn\Bundle\Twig\Components;

use Symfony\UX\TwigComponent\Attribute\AsTwigComponent;
use Twigcn\Bundle\Util\Cn;

#[AsTwigComponent]
final class SidebarMenu
{
    public string $class = '';

    public function getMenuClasses(): string
    {
        return Cn::merge('sidebar-menu', $this->class);
    }
}
