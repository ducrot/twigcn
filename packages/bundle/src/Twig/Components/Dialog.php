<?php

declare(strict_types=1);

namespace Twigcn\Bundle\Twig\Components;

use Symfony\UX\TwigComponent\Attribute\AsTwigComponent;
use Twigcn\Bundle\Util\Cn;

#[AsTwigComponent]
final class Dialog
{
    public string $id = '';
    public string $class = '';
    public bool $closeOnBackdrop = true;

    public function getDialogClasses(): string
    {
        return Cn::merge('dialog', $this->class);
    }
}
