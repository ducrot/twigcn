<?php

declare(strict_types=1);

namespace Twigcn\Bundle\Twig\Components;

use Symfony\UX\TwigComponent\Attribute\AsTwigComponent;

#[AsTwigComponent]
final class CommandItem
{
    public string $value = '';
    public bool $disabled = false;
    public string $class = '';
}
