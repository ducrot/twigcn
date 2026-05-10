<?php

declare(strict_types=1);

namespace Twigcn\Bundle\Twig\Components;

use Symfony\UX\TwigComponent\Attribute\AsTwigComponent;
use Twigcn\Bundle\Util\Cn;

#[AsTwigComponent]
final class SidebarTrigger
{
    public string $for = "[data-controller~='sidebar']";
    public string $class = '';

    public function getTriggerClasses(): string
    {
        return Cn::merge('sidebar-trigger', $this->class);
    }
}
