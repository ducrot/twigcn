<?php

declare(strict_types=1);

namespace Twigcn\Bundle\Twig\Components;

use Symfony\UX\TwigComponent\Attribute\AsTwigComponent;
use Twigcn\Bundle\Util\Cn;

#[AsTwigComponent]
final class Badge
{
    public string $variant = 'primary';
    public string $class = '';

    public function getBadgeClasses(): string
    {
        return Cn::merge(
            match ($this->variant) {
                'secondary' => 'badge-secondary',
                'destructive' => 'badge-destructive',
                'outline' => 'badge-outline',
                default => 'badge',
            },
            $this->class,
        );
    }
}
