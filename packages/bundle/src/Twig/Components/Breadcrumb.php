<?php

declare(strict_types=1);

namespace Twigcn\Bundle\Twig\Components;

use Symfony\UX\TwigComponent\Attribute\AsTwigComponent;

#[AsTwigComponent]
final class Breadcrumb
{
    public string $class = '';

    public function getBreadcrumbClasses(): string
    {
        $classes = ['flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5'];

        if ($this->class !== '') {
            $classes[] = $this->class;
        }

        return implode(' ', $classes);
    }
}
