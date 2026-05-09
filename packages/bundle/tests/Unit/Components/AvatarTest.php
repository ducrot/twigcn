<?php

declare(strict_types=1);

namespace Twigcn\Bundle\Tests\Unit\Components;

use PHPUnit\Framework\TestCase;
use Twigcn\Bundle\Twig\Components\Avatar;

final class AvatarTest extends TestCase
{
    public function test_default_size_uses_size_10(): void
    {
        self::assertStringContainsString('size-10', (new Avatar())->getAvatarClasses());
    }

    public function test_small_size_uses_size_8(): void
    {
        $avatar = new Avatar();
        $avatar->size = 'sm';

        self::assertStringContainsString('size-8', $avatar->getAvatarClasses());
    }

    public function test_large_size_uses_size_12(): void
    {
        $avatar = new Avatar();
        $avatar->size = 'lg';

        self::assertStringContainsString('size-12', $avatar->getAvatarClasses());
    }

    public function test_xl_size_uses_size_16(): void
    {
        $avatar = new Avatar();
        $avatar->size = 'xl';

        self::assertStringContainsString('size-16', $avatar->getAvatarClasses());
    }

    public function test_unknown_size_falls_back_to_size_10(): void
    {
        $avatar = new Avatar();
        $avatar->size = 'xxxxl';

        self::assertStringContainsString('size-10', $avatar->getAvatarClasses());
    }

    public function test_custom_class_is_appended(): void
    {
        $avatar = new Avatar();
        $avatar->class = 'ring-2';

        self::assertStringEndsWith('ring-2', $avatar->getAvatarClasses());
    }

    public function test_fallback_initials_uses_explicit_fallback_when_set(): void
    {
        $avatar = new Avatar();
        $avatar->fallback = 'XY';
        $avatar->alt = 'Should be ignored';

        self::assertSame('XY', $avatar->getFallbackInitials());
    }

    public function test_fallback_initials_returns_question_mark_for_empty_input(): void
    {
        self::assertSame('?', (new Avatar())->getFallbackInitials());
    }

    public function test_fallback_initials_uses_first_letter_of_single_word_alt(): void
    {
        $avatar = new Avatar();
        $avatar->alt = 'jane';

        self::assertSame('J', $avatar->getFallbackInitials());
    }

    public function test_fallback_initials_uses_first_letters_of_two_word_alt(): void
    {
        $avatar = new Avatar();
        $avatar->alt = 'Jane Doe';

        self::assertSame('JD', $avatar->getFallbackInitials());
    }

    public function test_fallback_initials_truncates_to_two_letters(): void
    {
        $avatar = new Avatar();
        $avatar->alt = 'Mary Jane Watson';

        self::assertSame('MJ', $avatar->getFallbackInitials());
    }
}
