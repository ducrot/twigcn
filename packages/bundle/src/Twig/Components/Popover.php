<?php

declare(strict_types=1);

namespace Twigcn\Bundle\Twig\Components;

use Symfony\UX\TwigComponent\Attribute\AsTwigComponent;
use Twigcn\Bundle\Util\Cn;

#[AsTwigComponent]
final class Popover
{
    public string $class = '';

    public function getPopoverClasses(): string
    {
        return Cn::merge('popover', $this->class);
    }
}
