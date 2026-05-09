<?php

declare(strict_types=1);

namespace Twigcn\Bundle\Twig\Components;

use Symfony\UX\TwigComponent\Attribute\AsTwigComponent;
use Twigcn\Bundle\Util\Cn;

#[AsTwigComponent]
final class BreadcrumbItem
{
    public string $href = '';
    public bool $current = false;
    public string $class = '';

    public function getItemClasses(): string
    {
        $base = $this->href !== '' && !$this->current
            ? 'inline-flex items-center gap-1.5 transition-colors hover:text-foreground'
            : 'inline-flex items-center gap-1.5 font-normal text-foreground';

        return Cn::merge($base, $this->class);
    }
}
