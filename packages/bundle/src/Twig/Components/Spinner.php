<?php

declare(strict_types=1);

namespace Twigcn\Bundle\Twig\Components;

use Symfony\UX\TwigComponent\Attribute\AsTwigComponent;
use Twigcn\Bundle\Util\Cn;

#[AsTwigComponent]
final class Spinner
{
    public string $size = 'default';
    public string $class = '';

    public function getSpinnerClasses(): string
    {
        return Cn::merge(
            'animate-spin',
            match ($this->size) {
                'sm' => 'size-4',
                'lg' => 'size-8',
                default => 'size-6',
            },
            $this->class,
        );
    }
}
