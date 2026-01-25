<?php

declare(strict_types=1);

namespace Twigcn\Bundle\Twig\Components;

use Symfony\UX\TwigComponent\Attribute\AsTwigComponent;

#[AsTwigComponent]
final class ButtonGroup
{
    public string $orientation = 'horizontal';
    public string $class = '';

    public function getGroupClasses(): string
    {
        $classes = ['button-group'];

        if ($this->class !== '') {
            $classes[] = $this->class;
        }

        return implode(' ', $classes);
    }
}
