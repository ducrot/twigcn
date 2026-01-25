<?php

declare(strict_types=1);

namespace Twigcn\Bundle\Twig\Components;

use Symfony\UX\TwigComponent\Attribute\AsTwigComponent;

#[AsTwigComponent]
final class Progress
{
    public int $value = 0;
    public int $max = 100;
    public string $class = '';

    public function getProgressClasses(): string
    {
        $classes = ['relative h-2 w-full overflow-hidden rounded-full bg-muted'];

        if ($this->class !== '') {
            $classes[] = $this->class;
        }

        return implode(' ', $classes);
    }

    public function getPercentage(): int
    {
        if ($this->max <= 0) {
            return 0;
        }

        $percentage = ($this->value / $this->max) * 100;

        return (int) min(100, max(0, $percentage));
    }
}
