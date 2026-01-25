<?php

declare(strict_types=1);

namespace Twigcn\Bundle\Twig\Components;

use Symfony\UX\TwigComponent\Attribute\AsTwigComponent;

#[AsTwigComponent]
final class Drawer
{
    public string $id = '';
    public string $side = 'right';
    public bool $closeOnBackdrop = true;
    public string $class = '';

    public function getDrawerClasses(): string
    {
        $classes = ['drawer'];

        if ($this->side !== '') {
            $classes[] = 'drawer-' . $this->side;
        }

        if ($this->class !== '') {
            $classes[] = $this->class;
        }

        return implode(' ', $classes);
    }
}
