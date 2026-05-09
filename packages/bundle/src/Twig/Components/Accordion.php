<?php

declare(strict_types=1);

namespace Twigcn\Bundle\Twig\Components;

use Symfony\UX\TwigComponent\Attribute\AsTwigComponent;
use Twigcn\Bundle\Util\Cn;

#[AsTwigComponent]
final class Accordion
{
    public string $class = '';
    public string $type = 'single';
    public bool $collapsible = true;

    public function getAccordionClasses(): string
    {
        return Cn::merge('divide-y', $this->class);
    }
}
