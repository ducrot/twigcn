<?php

declare(strict_types=1);

namespace Twigcn\Bundle\Twig\Components;

use Symfony\UX\TwigComponent\Attribute\AsTwigComponent;
use Twigcn\Bundle\Util\Cn;

#[AsTwigComponent]
final class SidebarContent
{
    public string $class = '';

    public function getContentClasses(): string
    {
        return Cn::merge('sidebar-content', $this->class);
    }
}
