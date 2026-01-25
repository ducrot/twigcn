<?php

declare(strict_types=1);

namespace Twigcn\Bundle\Twig\Components;

use Symfony\UX\TwigComponent\Attribute\AsTwigComponent;

#[AsTwigComponent]
final class Toast
{
    public string $variant = 'default';
    public string $class = '';

    public function getToastClasses(): string
    {
        $variantClass = $this->variant !== 'default' ? 'toast-' . $this->variant : null;

        return implode(' ', array_filter(['toast', $variantClass, $this->class ?: null]));
    }
}
