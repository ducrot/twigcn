<?php

declare(strict_types=1);

namespace Twigcn\Bundle\Twig\Components;

use Symfony\UX\TwigComponent\Attribute\AsTwigComponent;
use Twigcn\Bundle\Util\Cn;

#[AsTwigComponent]
final class Label
{
    public string $for = '';
    public string $class = '';

    public function getLabelClasses(): string
    {
        return Cn::merge('label', $this->class);
    }
}
