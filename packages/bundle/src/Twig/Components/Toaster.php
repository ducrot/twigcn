<?php

declare(strict_types=1);

namespace Twigcn\Bundle\Twig\Components;

use Symfony\UX\TwigComponent\Attribute\AsTwigComponent;
use Twigcn\Bundle\Util\Cn;

#[AsTwigComponent]
final class Toaster
{
    public string $position = 'bottom-right';
    public string $class = '';

    public function getToasterClasses(): string
    {
        return Cn::merge('toaster', $this->class);
    }

    public function getDataAlign(): string
    {
        return match ($this->position) {
            'bottom-left', 'top-left' => 'start',
            'bottom-center', 'top-center' => 'center',
            default => 'end',
        };
    }
}
