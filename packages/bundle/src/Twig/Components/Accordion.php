<?php

declare(strict_types=1);

namespace Twigcn\Bundle\Twig\Components;

use Symfony\UX\TwigComponent\Attribute\AsTwigComponent;

#[AsTwigComponent]
final class Accordion
{
    public string $class = '';
    public string $type = 'single';
    public bool $collapsible = true;

    public function getAccordionClasses(): string
    {
        $classes = ['divide-y'];

        if ($this->class !== '') {
            $classes[] = $this->class;
        }

        return implode(' ', $classes);
    }
}
