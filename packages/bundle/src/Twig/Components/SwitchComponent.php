<?php

declare(strict_types=1);

namespace Twigcn\Bundle\Twig\Components;

use Symfony\UX\TwigComponent\Attribute\AsTwigComponent;

// "Switch" is a reserved word in PHP, so the class is named SwitchComponent and
// the Twig name is set explicitly. The "Twigcn:" prefix must be repeated here:
// the bundle's name_prefix config is only auto-applied when the name is derived
// from the class name, not when it is set via the attribute argument.
#[AsTwigComponent('Twigcn:Switch')]
final class SwitchComponent
{
    public string $name = '';
    public string $id = '';
    public string $value = '';
    public bool $checked = false;
    public bool $disabled = false;
    public bool $invalid = false;
    public bool $required = false;
    public string $class = '';

    public function getSwitchClasses(): string
    {
        $classes = ['input'];

        if ($this->class !== '') {
            $classes[] = $this->class;
        }

        return implode(' ', $classes);
    }
}
