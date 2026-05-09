<?php

declare(strict_types=1);

namespace Twigcn\Bundle\Twig\Components;

use Symfony\UX\TwigComponent\Attribute\AsTwigComponent;
use Twigcn\Bundle\Util\Cn;

#[AsTwigComponent]
final class DrawerHeader
{
    public string $class = '';

    public function getHeaderClasses(): string
    {
        return Cn::merge('drawer-header', $this->class);
    }
}
