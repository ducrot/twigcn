<?php

declare(strict_types=1);

namespace Twigcn\Bundle\Twig\Components;

use Symfony\UX\TwigComponent\Attribute\AsTwigComponent;
use Twigcn\Bundle\Util\Cn;

#[AsTwigComponent]
final class Avatar
{
    public string $src = '';
    public string $alt = '';
    public string $fallback = '';
    public string $size = 'default';
    public string $class = '';

    public function getAvatarClasses(): string
    {
        return Cn::merge(
            'relative inline-flex shrink-0 overflow-hidden rounded-full',
            match ($this->size) {
                'sm' => 'size-8',
                'lg' => 'size-12',
                'xl' => 'size-16',
                default => 'size-10',
            },
            $this->class,
        );
    }

    public function getFallbackInitials(): string
    {
        if ($this->fallback !== '') {
            return $this->fallback;
        }

        if ($this->alt === '') {
            return '?';
        }

        $words = explode(' ', $this->alt);
        $initials = '';

        foreach ($words as $word) {
            if ($word !== '') {
                $initials .= mb_strtoupper(mb_substr($word, 0, 1));
            }
        }

        return mb_substr($initials, 0, 2);
    }
}
