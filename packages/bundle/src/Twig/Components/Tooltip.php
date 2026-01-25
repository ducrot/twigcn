<?php

declare(strict_types=1);

namespace Twigcn\Bundle\Twig\Components;

use Symfony\UX\TwigComponent\Attribute\AsTwigComponent;

#[AsTwigComponent]
final class Tooltip
{
    public string $text = '';
    public string $side = 'top';
    public string $align = 'center';
    public string $class = '';
}
