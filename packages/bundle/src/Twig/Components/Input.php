<?php

declare(strict_types=1);

namespace Twigcn\Bundle\Twig\Components;

use Symfony\UX\TwigComponent\Attribute\AsTwigComponent;

#[AsTwigComponent]
final class Input
{
    public string $type = 'text';
    public string $name = '';
    public string $id = '';
    public string $placeholder = '';
    public string $value = '';
    public bool $disabled = false;
    public bool $invalid = false;
    public bool $required = false;
    public string $class = '';

    public function getInputClasses(): string
    {
        $classes = ['input'];

        if ($this->class !== '') {
            $classes[] = $this->class;
        }

        return implode(' ', $classes);
    }
}
