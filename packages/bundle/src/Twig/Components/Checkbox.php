<?php

declare(strict_types=1);

namespace Twigcn\Bundle\Twig\Components;

use Symfony\UX\TwigComponent\Attribute\AsTwigComponent;
use Twigcn\Bundle\Util\Cn;

#[AsTwigComponent]
final class Checkbox
{
    public string $name = '';
    public string $id = '';
    public string $value = '';
    public bool $checked = false;
    public bool $disabled = false;
    public bool $invalid = false;
    public bool $required = false;
    public string $class = '';

    public function getCheckboxClasses(): string
    {
        return Cn::merge('input', $this->class);
    }
}
