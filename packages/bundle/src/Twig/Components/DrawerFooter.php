<?php

declare(strict_types=1);

namespace Twigcn\Bundle\Twig\Components;

use Symfony\UX\TwigComponent\Attribute\AsTwigComponent;
use Twigcn\Bundle\Util\Cn;

#[AsTwigComponent]
final class DrawerFooter
{
    public string $class = '';

    public function getFooterClasses(): string
    {
        return Cn::merge('drawer-footer', $this->class);
    }
}
