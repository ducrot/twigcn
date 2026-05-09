<?php

declare(strict_types=1);

namespace Twigcn\Bundle\Twig\Components;

use Symfony\UX\TwigComponent\Attribute\AsTwigComponent;
use Twigcn\Bundle\Util\Cn;

#[AsTwigComponent]
final class CommandEmpty
{
    public string $class = '';

    public function getEmptyClasses(): string
    {
        return Cn::merge('command-empty hidden', $this->class);
    }
}
