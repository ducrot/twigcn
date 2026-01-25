<?php

declare(strict_types=1);

namespace Twigcn\Bundle\Twig\Components;

use Symfony\UX\TwigComponent\Attribute\AsTwigComponent;

#[AsTwigComponent]
final class RadioGroup
{
    public string $name = '';
    public string $legend = '';
    public bool $required = false;
    public string $class = '';

    public function getGroupClasses(): string
    {
        $classes = ['flex flex-col gap-2'];

        if ($this->class !== '') {
            $classes[] = $this->class;
        }

        return implode(' ', $classes);
    }
}
