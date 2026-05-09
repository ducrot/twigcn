<?php

declare(strict_types=1);

namespace Twigcn\Bundle\Twig\Components;

use Symfony\UX\TwigComponent\Attribute\AsTwigComponent;
use Twigcn\Bundle\Util\Cn;

#[AsTwigComponent]
final class SidebarGroup
{
    public string $class = '';

    public function getGroupClasses(): string
    {
        return Cn::merge('sidebar-group', $this->class);
    }
}
