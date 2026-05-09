<?php

declare(strict_types=1);

namespace Twigcn\Bundle\Twig\Components;

use Symfony\UX\TwigComponent\Attribute\AsTwigComponent;
use Twigcn\Bundle\Util\Cn;

#[AsTwigComponent]
final class CarouselNext
{
    public string $class = '';

    public function getNextClasses(): string
    {
        return Cn::merge('carousel-next', $this->class);
    }
}
