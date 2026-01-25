<?php

declare(strict_types=1);

namespace Twigcn\Bundle\Twig\Components;

use Symfony\UX\TwigComponent\Attribute\AsTwigComponent;

#[AsTwigComponent]
final class Dialog
{
    public string $id = '';
    public string $class = '';
    public bool $closeOnBackdrop = true;

    public function getDialogClasses(): string
    {
        $classes = ['dialog'];

        if ($this->class !== '') {
            $classes[] = $this->class;
        }

        return implode(' ', $classes);
    }
}
