<?php

declare(strict_types=1);

namespace Twigcn\Bundle\Twig\Components;

use Symfony\UX\TwigComponent\Attribute\AsTwigComponent;

#[AsTwigComponent]
final class Item
{
    public string $href = '';
    public bool $active = false;
    public bool $disabled = false;
    public string $class = '';

    public function getItemClasses(): string
    {
        $classes = ['flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors'];

        if ($this->active) {
            $classes[] = 'bg-accent text-accent-foreground';
        } else {
            $classes[] = 'text-muted-foreground hover:bg-accent hover:text-accent-foreground';
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
