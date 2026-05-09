<?php

declare(strict_types=1);

namespace Twigcn\Bundle\Twig\Components;

use Symfony\UX\TwigComponent\Attribute\AsTwigComponent;
use Twigcn\Bundle\Util\Cn;

#[AsTwigComponent]
final class Item
{
    public string $href = '';
    public bool $active = false;
    public bool $disabled = false;
    public string $class = '';

    public function getItemClasses(): string
    {
        return Cn::merge(
            'flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors',
            $this->active
                ? 'bg-accent text-accent-foreground'
                : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
            $this->disabled ? 'pointer-events-none opacity-50' : null,
            $this->class,
        );
    }
}
