<?php

declare(strict_types=1);

namespace Twigcn\Bundle\Twig\Components;

use Symfony\UX\TwigComponent\Attribute\AsTwigComponent;

#[AsTwigComponent]
final class ChoiceCard
{
    public string $type = 'radio';
    public string $name = '';
    public string $id = '';
    public string $value = '';
    public bool $checked = false;
    public bool $disabled = false;
    public string $class = '';
}
