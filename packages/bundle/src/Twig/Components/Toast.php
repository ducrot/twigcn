<?php

declare(strict_types=1);

namespace Twigcn\Bundle\Twig\Components;

use Symfony\UX\TwigComponent\Attribute\AsTwigComponent;
use Twigcn\Bundle\Util\Cn;

#[AsTwigComponent]
final class Toast
{
    public string $variant = 'default';
    public string $class = '';

    public function getToastClasses(): string
    {
        return Cn::merge(
            'toast',
            $this->variant !== 'default' ? 'toast-' . $this->variant : null,
            $this->class,
        );
    }
}
