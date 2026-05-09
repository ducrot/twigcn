<?php

declare(strict_types=1);

namespace Twigcn\Bundle\Twig\Components;

use Symfony\UX\TwigComponent\Attribute\AsTwigComponent;
use Twigcn\Bundle\Util\Cn;

#[AsTwigComponent]
final class SidebarHeader
{
    public string $class = '';

    public function getHeaderClasses(): string
    {
        return Cn::merge('sidebar-header', $this->class);
    }
}
