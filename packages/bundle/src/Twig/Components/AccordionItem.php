<?php

declare(strict_types=1);

namespace Twigcn\Bundle\Twig\Components;

use Symfony\UX\TwigComponent\Attribute\AsTwigComponent;

#[AsTwigComponent]
final class AccordionItem
{
    public string $title = '';
    public bool $open = false;
    public string $class = '';
}
