<?php

declare(strict_types=1);

namespace Twigcn\Bundle\Twig\Components;

use Symfony\UX\TwigComponent\Attribute\AsTwigComponent;

#[AsTwigComponent]
final class Tabs
{
    public string $defaultValue = '';
    public string $storageKey = '';
    public string $class = '';

    public function getTabsClasses(): string
    {
        $classes = ['tabs'];

        if ($this->class !== '') {
            $classes[] = $this->class;
        }

        return implode(' ', $classes);
    }
}
