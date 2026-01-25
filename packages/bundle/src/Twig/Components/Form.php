<?php

declare(strict_types=1);

namespace Twigcn\Bundle\Twig\Components;

use Symfony\UX\TwigComponent\Attribute\AsTwigComponent;

#[AsTwigComponent]
final class Form
{
    public string $action = '';
    public string $method = 'POST';
    public string $class = '';

    public function getFormClasses(): string
    {
        $classes = ['form'];

        if ($this->class !== '') {
            $classes[] = $this->class;
        }

        return implode(' ', $classes);
    }
}
