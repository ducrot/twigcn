<?php

declare(strict_types=1);

namespace Twigcn\Bundle\Twig\Components;

use Symfony\UX\TwigComponent\Attribute\AsTwigComponent;
use Twigcn\Bundle\Util\Cn;

#[AsTwigComponent]
final class Drawer
{
    public string $id = '';
    public string $side = 'right';
    public bool $closeOnBackdrop = true;
    public string $class = '';

    public function getDrawerClasses(): string
    {
        return Cn::merge(
            'drawer',
            $this->side !== '' ? 'drawer-' . $this->side : null,
            $this->class,
        );
    }
}
