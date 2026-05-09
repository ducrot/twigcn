<?php

declare(strict_types=1);

namespace Twigcn\Bundle\Twig\Components;

use Symfony\UX\TwigComponent\Attribute\AsTwigComponent;
use Twigcn\Bundle\Util\Cn;

// "Empty" is a reserved word in PHP, so the class is named EmptyState and the
// Twig name is set explicitly. The "Twigcn:" prefix must be repeated here: the
// bundle's name_prefix config is only auto-applied when the name is derived
// from the class name, not when it is set via the attribute argument.
#[AsTwigComponent('Twigcn:Empty')]
final class EmptyState
{
    public string $icon = '';
    public string $title = '';
    public string $description = '';
    public string $class = '';

    public function getEmptyClasses(): string
    {
        return Cn::merge(
            'flex flex-col items-center justify-center py-12 text-center',
            $this->class,
        );
    }
}
