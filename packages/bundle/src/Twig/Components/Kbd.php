<?php

declare(strict_types=1);

namespace Twigcn\Bundle\Twig\Components;

use Symfony\UX\TwigComponent\Attribute\AsTwigComponent;
use Twigcn\Bundle\Util\Cn;

#[AsTwigComponent]
final class Kbd
{
    public string $class = '';

    public function getKbdClasses(): string
    {
        return Cn::merge('kbd', $this->class);
    }
}
