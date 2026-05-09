<?php

declare(strict_types=1);

namespace Twigcn\Bundle\Twig\Components;

use Symfony\UX\TwigComponent\Attribute\AsTwigComponent;
use Twigcn\Bundle\Util\Cn;

#[AsTwigComponent]
final class Command
{
    public string $class = '';

    public function getCommandClasses(): string
    {
        return Cn::merge('command', $this->class);
    }
}
