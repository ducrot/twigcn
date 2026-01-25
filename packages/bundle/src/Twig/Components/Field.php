<?php

declare(strict_types=1);

namespace Twigcn\Bundle\Twig\Components;

use Symfony\UX\TwigComponent\Attribute\AsTwigComponent;

#[AsTwigComponent]
final class Field
{
    public string $orientation = 'vertical';
    public bool $invalid = false;
    public string $class = '';

    public function getFieldClasses(): string
    {
        $classes = ['field'];

        if ($this->class !== '') {
            $classes[] = $this->class;
        }

        return implode(' ', $classes);
    }
}
