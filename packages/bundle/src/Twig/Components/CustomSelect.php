<?php

declare(strict_types=1);

namespace Twigcn\Bundle\Twig\Components;

use Symfony\UX\TwigComponent\Attribute\AsTwigComponent;

#[AsTwigComponent]
final class CustomSelect
{
    public string $name = '';
    public string $id = '';
    public string $placeholder = 'Select...';
    public string $value = '';
    public bool $disabled = false;
    public bool $invalid = false;
    public bool $multiple = false;
    public bool $searchable = false;
    public string $searchPlaceholder = 'Search...';
    public string $class = '';
    public string $listboxClass = '';
}
