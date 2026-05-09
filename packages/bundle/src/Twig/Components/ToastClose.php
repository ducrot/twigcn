<?php

declare(strict_types=1);

namespace Twigcn\Bundle\Twig\Components;

use Symfony\UX\TwigComponent\Attribute\AsTwigComponent;
use Twigcn\Bundle\Util\Cn;

#[AsTwigComponent]
final class ToastClose
{
    public string $class = '';

    public function getCloseClasses(): string
    {
        return Cn::merge('toast-close', $this->class);
    }
}
