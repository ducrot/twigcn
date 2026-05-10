<?php

declare(strict_types=1);

namespace Twigcn\Bundle\Twig\Components;

use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\UX\TwigComponent\Attribute\AsTwigComponent;
use Twigcn\Bundle\Util\Cn;

#[AsTwigComponent]
final class Sidebar
{
    public string $side = 'left';
    public string $variant = 'sidebar';
    public string $collapsible = 'none';
    public string $class = '';

    public function __construct(private readonly RequestStack $requestStack)
    {
    }

    public function getSidebarClasses(): string
    {
        return Cn::merge('sidebar', $this->class);
    }

    public function getInitialState(): string
    {
        if ($this->collapsible === 'none') {
            return 'expanded';
        }

        $request = $this->requestStack->getCurrentRequest();
        $cookie = $request?->cookies->get('sidebar_state');

        return $cookie === 'false' ? 'collapsed' : 'expanded';
    }
}
