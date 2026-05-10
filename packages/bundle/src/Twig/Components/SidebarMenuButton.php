<?php

declare(strict_types=1);

namespace Twigcn\Bundle\Twig\Components;

use Symfony\UX\TwigComponent\Attribute\AsTwigComponent;
use Twigcn\Bundle\Util\Cn;

#[AsTwigComponent]
final class SidebarMenuButton
{
    public string $href = '';
    public bool $active = false;
    public string $size = 'default';
    public string $class = '';

    public function getButtonClasses(): string
    {
        return Cn::merge('sidebar-menu-button', $this->class);
    }
}
