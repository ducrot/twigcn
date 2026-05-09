<?php

declare(strict_types=1);

namespace Twigcn\Bundle\Twig\Components;

use Symfony\UX\TwigComponent\Attribute\AsTwigComponent;
use Twigcn\Bundle\Util\Cn;

#[AsTwigComponent]
final class DrawerContent
{
    public string $class = '';

    public function getContentClasses(): string
    {
        return Cn::merge('drawer-content', $this->class);
    }
}
