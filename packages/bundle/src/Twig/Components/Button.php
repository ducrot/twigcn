<?php

declare(strict_types=1);

namespace Twigcn\Bundle\Twig\Components;

use Symfony\UX\TwigComponent\Attribute\AsTwigComponent;
use Twigcn\Bundle\Util\Cn;

#[AsTwigComponent]
final class Button
{
    public string $variant = 'primary';
    public string $size = 'default';
    public string $type = 'button';
    public bool $disabled = false;
    public bool $iconOnly = false;
    public string $class = '';
    public string $as = 'button';
    public ?string $href = null;

    public function getButtonClasses(): string
    {
        $parts = ['btn'];

        if ($this->size !== 'default') {
            $parts[] = $this->size;
        }
        if ($this->iconOnly) {
            $parts[] = 'icon';
        }
        if ($this->variant !== 'primary') {
            $parts[] = $this->variant;
        }

        return Cn::merge(implode('-', $parts), $this->class);
    }
}
