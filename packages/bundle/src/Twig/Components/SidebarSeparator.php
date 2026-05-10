<?php

declare(strict_types=1);

namespace Twigcn\Bundle\Twig\Components;

use Symfony\UX\TwigComponent\Attribute\AsTwigComponent;
use Twigcn\Bundle\Util\Cn;

#[AsTwigComponent]
final class SidebarSeparator
{
    public string $class = '';

    public function getSeparatorClasses(): string
    {
        return Cn::merge('sidebar-separator', $this->class);
    }
}
