<?php

declare(strict_types=1);

namespace Twigcn\Bundle\Twig\Components;

use Symfony\UX\TwigComponent\Attribute\AsTwigComponent;
use Twigcn\Bundle\Util\Cn;

#[AsTwigComponent]
final class Form
{
    public string $action = '';
    public string $method = 'POST';
    public string $class = '';

    public function getFormClasses(): string
    {
        return Cn::merge('form', $this->class);
    }
}
