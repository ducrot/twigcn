<?php

declare(strict_types=1);

namespace Twigcn\Bundle\Twig\Components;

use Symfony\UX\TwigComponent\Attribute\AsTwigComponent;
use Twigcn\Bundle\Util\Cn;

#[AsTwigComponent]
final class Select
{
    public string $name = '';
    public string $id = '';
    public string $placeholder = '';
    public string $value = '';
    public bool $disabled = false;
    public bool $invalid = false;
    public bool $required = false;
    public string $class = '';

    public function getSelectClasses(): string
    {
        return Cn::merge('select', $this->class);
    }
}
