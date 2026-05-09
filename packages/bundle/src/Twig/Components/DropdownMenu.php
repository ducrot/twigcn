<?php

declare(strict_types=1);

namespace Twigcn\Bundle\Twig\Components;

use Symfony\UX\TwigComponent\Attribute\AsTwigComponent;
use Twigcn\Bundle\Util\Cn;

#[AsTwigComponent]
final class DropdownMenu
{
    public string $class = '';

    public function getDropdownClasses(): string
    {
        return Cn::merge('dropdown-menu', $this->class);
    }
}
