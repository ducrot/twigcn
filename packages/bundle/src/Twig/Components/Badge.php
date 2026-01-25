<?php

declare(strict_types=1);

namespace Twigcn\Bundle\Twig\Components;

use Symfony\UX\TwigComponent\Attribute\AsTwigComponent;

#[AsTwigComponent]
final class Badge
{
    public string $variant = 'primary';
    public string $class = '';

    public function getBadgeClasses(): string
    {
        $classes = [];

        $classes[] = match ($this->variant) {
            'secondary' => 'badge-secondary',
            'destructive' => 'badge-destructive',
            'outline' => 'badge-outline',
            default => 'badge',
        };

        if ($this->class !== '') {
            $classes[] = $this->class;
        }

        return implode(' ', $classes);
    }
}
