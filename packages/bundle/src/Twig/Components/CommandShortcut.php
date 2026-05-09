<?php

declare(strict_types=1);

namespace Twigcn\Bundle\Twig\Components;

use Symfony\UX\TwigComponent\Attribute\AsTwigComponent;
use Twigcn\Bundle\Util\Cn;

#[AsTwigComponent]
final class CommandShortcut
{
    public string $class = '';

    public function getShortcutClasses(): string
    {
        return Cn::merge('command-shortcut', $this->class);
    }
}
