<?php

declare(strict_types=1);

namespace Twigcn\Bundle\Twig\Components;

use Symfony\UX\TwigComponent\Attribute\AsTwigComponent;

#[AsTwigComponent]
final class PaginationItem
{
    public string $href = '';
    public bool $active = false;
    public bool $disabled = false;
    public string $class = '';

    public function getItemClasses(): string
    {
        $classes = ['inline-flex items-center justify-center gap-1 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring h-9 min-w-9 px-3'];

        if ($this->active) {
            $classes[] = 'border border-input bg-background shadow-sm';
        } else {
            $classes[] = 'hover:bg-accent hover:text-accent-foreground';
        }

        if ($this->disabled) {
            $classes[] = 'pointer-events-none opacity-50';
        }

        if ($this->class !== '') {
            $classes[] = $this->class;
        }

        return implode(' ', $classes);
    }
}
