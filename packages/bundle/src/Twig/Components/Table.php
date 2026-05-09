<?php

declare(strict_types=1);

namespace Twigcn\Bundle\Twig\Components;

use Symfony\UX\TwigComponent\Attribute\AsTwigComponent;
use Twigcn\Bundle\Util\Cn;

#[AsTwigComponent]
final class Table
{
    public string $class = '';

    public function getTableClasses(): string
    {
        return Cn::merge('table', $this->class);
    }
}
