<?php

declare(strict_types=1);

namespace Twigcn\Bundle\Twig\Components;

use Symfony\UX\TwigComponent\Attribute\AsTwigComponent;
use Twigcn\Bundle\Util\Cn;

#[AsTwigComponent]
final class CommandSeparator
{
    public string $class = '';

    public function getSeparatorClasses(): string
    {
        return Cn::merge('command-separator', $this->class);
    }
}
