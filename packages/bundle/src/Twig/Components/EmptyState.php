<?php

declare(strict_types=1);

namespace Twigcn\Bundle\Twig\Components;

use Symfony\UX\TwigComponent\Attribute\AsTwigComponent;

#[AsTwigComponent('Empty')]
final class EmptyState
{
    public string $icon = '';
    public string $title = '';
    public string $description = '';
    public string $class = '';

    public function getEmptyClasses(): string
    {
        $classes = ['flex flex-col items-center justify-center py-12 text-center'];

        if ($this->class !== '') {
            $classes[] = $this->class;
        }

        return implode(' ', $classes);
    }
}
