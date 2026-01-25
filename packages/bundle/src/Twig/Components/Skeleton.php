<?php

declare(strict_types=1);

namespace Twigcn\Bundle\Twig\Components;

use Symfony\UX\TwigComponent\Attribute\AsTwigComponent;

#[AsTwigComponent]
final class Skeleton
{
    public string $class = '';

    public function getSkeletonClasses(): string
    {
        $classes = ['animate-pulse rounded-md bg-muted'];

        if ($this->class !== '') {
            $classes[] = $this->class;
        }

        return implode(' ', $classes);
    }
}
