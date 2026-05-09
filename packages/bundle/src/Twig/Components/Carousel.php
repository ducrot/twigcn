<?php

declare(strict_types=1);

namespace Twigcn\Bundle\Twig\Components;

use Symfony\UX\TwigComponent\Attribute\AsTwigComponent;
use Twigcn\Bundle\Util\Cn;

#[AsTwigComponent]
final class Carousel
{
    public string $orientation = 'horizontal';
    public string $class = '';

    public function getCarouselClasses(): string
    {
        return Cn::merge(
            'carousel',
            $this->orientation === 'vertical' ? 'carousel-vertical' : null,
            $this->class,
        );
    }
}
