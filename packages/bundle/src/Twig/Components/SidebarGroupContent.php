<?php

declare(strict_types=1);

namespace Twigcn\Bundle\Twig\Components;

use Symfony\UX\TwigComponent\Attribute\AsTwigComponent;
use Twigcn\Bundle\Util\Cn;

#[AsTwigComponent]
final class SidebarGroupContent
{
    public string $class = '';

    public function getContentClasses(): string
    {
        return Cn::merge('sidebar-group-content', $this->class);
    }
}
