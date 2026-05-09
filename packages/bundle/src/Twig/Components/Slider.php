<?php

declare(strict_types=1);

namespace Twigcn\Bundle\Twig\Components;

use Symfony\UX\TwigComponent\Attribute\AsTwigComponent;
use Twigcn\Bundle\Util\Cn;

#[AsTwigComponent]
final class Slider
{
    public string $name = '';
    public string $id = '';
    public int|float $value = 50;
    public int|float $min = 0;
    public int|float $max = 100;
    public int|float $step = 1;
    public bool $disabled = false;
    public string $class = '';

    public function getSliderClasses(): string
    {
        return Cn::merge('input w-full', $this->class);
    }

    public function getSliderValue(): float
    {
        if ($this->max <= $this->min) {
            return 0;
        }

        return (($this->value - $this->min) / ($this->max - $this->min)) * 100;
    }
}
