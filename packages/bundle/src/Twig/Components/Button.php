<?php

declare(strict_types=1);

namespace Twigcn\Bundle\Twig\Components;

use Symfony\UX\TwigComponent\Attribute\AsTwigComponent;

#[AsTwigComponent]
final class Button
{
    public string $variant = 'primary';
    public string $size = 'default';
    public string $type = 'button';
    public bool $disabled = false;
    public bool $iconOnly = false;
    public string $class = '';
    public string $as = 'button';
    public ?string $href = null;

    public function getButtonClasses(): string
    {
        $classes = [];

        if ($this->iconOnly) {
            // Icon-only button: btn-icon, btn-sm-icon, btn-lg-icon-outline, etc.
            $parts = [];
            if ($this->size !== 'default') {
                $parts[] = $this->size;
            }
            $parts[] = 'icon';
            if ($this->variant !== 'primary') {
                $parts[] = $this->variant;
            }
            $classes[] = 'btn-' . implode('-', $parts);
        } else {
            // Regular button
            if ($this->size === 'default' && $this->variant === 'primary') {
                $classes[] = 'btn';
            } elseif ($this->size === 'default') {
                $classes[] = 'btn-' . $this->variant;
            } elseif ($this->variant === 'primary') {
                $classes[] = 'btn-' . $this->size;
            } else {
                $classes[] = 'btn-' . $this->size . '-' . $this->variant;
            }
        }

        if ($this->class !== '') {
            $classes[] = $this->class;
        }

        return implode(' ', $classes);
    }
}
