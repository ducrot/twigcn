<?php

declare(strict_types=1);

namespace Twigcn\Bundle\Twig\Components;

use Symfony\UX\TwigComponent\Attribute\AsTwigComponent;
use Twigcn\Bundle\Util\Cn;

#[AsTwigComponent]
final class SidebarInset
{
    public string $class = '';

    public function getInsetClasses(): string
    {
        return Cn::merge('sidebar-inset', $this->class);
    }
}
