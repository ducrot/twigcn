<?php

declare(strict_types=1);

namespace Twigcn\Bundle\Twig\Components;

use Symfony\UX\TwigComponent\Attribute\AsTwigComponent;

#[AsTwigComponent]
final class Alert
{
    public string $variant = 'default';
    public string $class = '';

    public function getAlertClasses(): string
    {
        $classes = [];

        $classes[] = match ($this->variant) {
            'destructive' => 'alert-destructive',
            default => 'alert',
        };

        if ($this->class !== '') {
            $classes[] = $this->class;
        }

        return implode(' ', $classes);
    }
}
