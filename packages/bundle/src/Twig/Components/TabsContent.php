<?php

declare(strict_types=1);

namespace Twigcn\Bundle\Twig\Components;

use Symfony\UX\TwigComponent\Attribute\AsTwigComponent;

#[AsTwigComponent]
final class TabsContent
{
    public string $value = '';
    public bool $active = false;
    public string $class = '';
}
