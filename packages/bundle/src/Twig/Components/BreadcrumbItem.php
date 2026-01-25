<?php

declare(strict_types=1);

namespace Twigcn\Bundle\Twig\Components;

use Symfony\UX\TwigComponent\Attribute\AsTwigComponent;

#[AsTwigComponent]
final class BreadcrumbItem
{
    public string $href = '';
    public bool $current = false;
    public string $class = '';
}
