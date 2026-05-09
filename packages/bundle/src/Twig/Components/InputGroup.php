<?php

declare(strict_types=1);

namespace Twigcn\Bundle\Twig\Components;

use Symfony\UX\TwigComponent\Attribute\AsTwigComponent;
use Twigcn\Bundle\Util\Cn;

#[AsTwigComponent]
final class InputGroup
{
    public string $class = '';

    public function getGroupClasses(): string
    {
        return Cn::merge('flex items-center', $this->class);
    }
}
