<?php

declare(strict_types=1);

namespace Twigcn\Bundle\Twig\Components;

use Symfony\UX\TwigComponent\Attribute\AsTwigComponent;
use Twigcn\Bundle\Util\Cn;

#[AsTwigComponent]
final class PaginationItem
{
    public string $href = '';
    public bool $active = false;
    public bool $disabled = false;
    public string $class = '';

    public function getItemClasses(): string
    {
        return Cn::merge(
            'inline-flex items-center justify-center gap-1 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring h-9 min-w-9 px-3',
            $this->active
                ? 'border border-input bg-background shadow-sm'
                : 'hover:bg-accent hover:text-accent-foreground',
            $this->disabled ? 'pointer-events-none opacity-50' : null,
            $this->class,
        );
    }
}
