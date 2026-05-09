<?php

declare(strict_types=1);

namespace Twigcn\Bundle\Twig\Components;

use Symfony\UX\TwigComponent\Attribute\AsTwigComponent;
use Twigcn\Bundle\Util\Cn;

#[AsTwigComponent]
final class Tabs
{
    public string $defaultValue = '';
    public string $storageKey = '';
    public string $class = '';

    public function getTabsClasses(): string
    {
        return Cn::merge('tabs', $this->class);
    }
}
