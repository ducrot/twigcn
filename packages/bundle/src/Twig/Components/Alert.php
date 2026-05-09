<?php

declare(strict_types=1);

namespace Twigcn\Bundle\Twig\Components;

use Symfony\UX\TwigComponent\Attribute\AsTwigComponent;
use Twigcn\Bundle\Util\Cn;

#[AsTwigComponent]
final class Alert
{
    public string $variant = 'default';
    public string $class = '';

    public function getAlertClasses(): string
    {
        return Cn::merge(
            match ($this->variant) {
                'destructive' => 'alert-destructive',
                default => 'alert',
            },
            $this->class,
        );
    }
}
