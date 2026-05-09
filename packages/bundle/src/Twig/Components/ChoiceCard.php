<?php

declare(strict_types=1);

namespace Twigcn\Bundle\Twig\Components;

use Symfony\UX\TwigComponent\Attribute\AsTwigComponent;
use Twigcn\Bundle\Util\Cn;

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

    public function getCardClasses(): string
    {
        return Cn::merge(
            'flex gap-3 border rounded-md p-4 cursor-pointer has-[:checked]:border-primary has-[:checked]:bg-primary/5 dark:has-[:checked]:bg-primary/10 has-[:disabled]:opacity-50 has-[:disabled]:cursor-not-allowed',
            $this->class,
        );
    }
}
