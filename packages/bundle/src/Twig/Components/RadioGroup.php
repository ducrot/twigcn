<?php

declare(strict_types=1);

namespace Twigcn\Bundle\Twig\Components;

use Symfony\UX\TwigComponent\Attribute\AsTwigComponent;
use Twigcn\Bundle\Util\Cn;

#[AsTwigComponent]
final class RadioGroup
{
    public string $name = '';
    public string $legend = '';
    public bool $required = false;
    public string $class = '';

    public function getGroupClasses(): string
    {
        return Cn::merge('flex flex-col gap-2', $this->class);
    }
}
