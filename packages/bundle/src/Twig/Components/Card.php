<?php

declare(strict_types=1);

namespace Twigcn\Bundle\Twig\Components;

use Symfony\UX\TwigComponent\Attribute\AsTwigComponent;
use Twigcn\Bundle\Util\Cn;

#[AsTwigComponent]
final class Card
{
    public string $class = '';

    public function getCardClasses(): string
    {
        return Cn::merge('card', $this->class);
    }
}
