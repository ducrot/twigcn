<?php

declare(strict_types=1);

namespace Twigcn\Bundle\Twig\Components;

use Symfony\UX\TwigComponent\Attribute\AsTwigComponent;

#[AsTwigComponent]
final class Spinner
{
    public string $size = 'default';
    public string $class = '';

    public function getSpinnerClasses(): string
    {
        $classes = ['animate-spin'];

        $classes[] = match ($this->size) {
            'sm' => 'size-4',
            'lg' => 'size-8',
            default => 'size-6',
        };

        if ($this->class !== '') {
            $classes[] = $this->class;
        }

        return implode(' ', $classes);
    }
}
