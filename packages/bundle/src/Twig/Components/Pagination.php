<?php

declare(strict_types=1);

namespace Twigcn\Bundle\Twig\Components;

use Symfony\UX\TwigComponent\Attribute\AsTwigComponent;
use Twigcn\Bundle\Util\Cn;

#[AsTwigComponent]
final class Pagination
{
    public string $class = '';

    public function getPaginationClasses(): string
    {
        return Cn::merge('mx-auto flex w-full justify-center', $this->class);
    }
}
