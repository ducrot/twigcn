<?php

declare(strict_types=1);

namespace Twigcn\Bundle\Twig\Components;

use Symfony\UX\TwigComponent\Attribute\AsTwigComponent;
use Twigcn\Bundle\Util\Cn;

#[AsTwigComponent]
final class Skeleton
{
    public string $class = '';

    public function getSkeletonClasses(): string
    {
        return Cn::merge('animate-pulse rounded-md bg-muted', $this->class);
    }
}
