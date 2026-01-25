<?php

declare(strict_types=1);

namespace Twigcn\Bundle\Twig\Components;

use Symfony\UX\TwigComponent\Attribute\AsTwigComponent;

#[AsTwigComponent]
final class ComboboxItem
{
    public string $value = '';
    public string $label = '';
    public bool $selected = false;
    public string $class = '';
}
