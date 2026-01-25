<?php

declare(strict_types=1);

namespace Twigcn\Bundle\Twig\Components;

use Symfony\UX\TwigComponent\Attribute\AsTwigComponent;

#[AsTwigComponent]
final class Carousel
{
    public string $orientation = 'horizontal';
    public string $class = '';

    public function getCarouselClasses(): string
    {
        $classes = ['carousel'];

        if ($this->orientation === 'vertical') {
            $classes[] = 'carousel-vertical';
        }

        if ($this->class !== '') {
            $classes[] = $this->class;
        }

        return implode(' ', $classes);
    }
}
