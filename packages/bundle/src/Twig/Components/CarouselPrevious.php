<?php

declare(strict_types=1);

namespace Twigcn\Bundle\Twig\Components;

use Symfony\UX\TwigComponent\Attribute\AsTwigComponent;
use Twigcn\Bundle\Util\Cn;

#[AsTwigComponent]
final class CarouselPrevious
{
    public string $class = '';

    public function getPreviousClasses(): string
    {
        return Cn::merge('carousel-previous', $this->class);
    }
}
