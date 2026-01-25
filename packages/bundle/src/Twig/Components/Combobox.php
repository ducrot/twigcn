<?php

declare(strict_types=1);

namespace Twigcn\Bundle\Twig\Components;

use Symfony\UX\TwigComponent\Attribute\AsTwigComponent;

#[AsTwigComponent]
final class Combobox
{
    public string $placeholder = 'Select option...';
    public string $searchPlaceholder = 'Search...';
    public string $emptyText = 'No results found.';
    public string $name = '';
    public string $id = '';
    public string $value = '';
    public bool $disabled = false;
    public string $class = '';
}
