<?php

declare(strict_types=1);

namespace Twigcn\Bundle\Twig\Components;

use Symfony\UX\TwigComponent\Attribute\AsTwigComponent;
use Twigcn\Bundle\Util\Cn;

#[AsTwigComponent]
final class Field
{
    public string $orientation = 'vertical';
    public bool $invalid = false;
    public string $class = '';

    public function getFieldClasses(): string
    {
        return Cn::merge('field', $this->class);
    }
}
