<?php

declare(strict_types=1);

namespace Twigcn\Bundle\Tests\Unit\Components;

use PHPUnit\Framework\TestCase;
use Twigcn\Bundle\Twig\Components\Alert;

final class AlertTest extends TestCase
{
    public function test_default_variant_returns_alert(): void
    {
        self::assertSame('alert', (new Alert())->getAlertClasses());
    }

    public function test_destructive_variant_returns_alert_destructive(): void
    {
        $alert = new Alert();
        $alert->variant = 'destructive';

        self::assertSame('alert-destructive', $alert->getAlertClasses());
    }

    public function test_unknown_variant_falls_back_to_alert(): void
    {
        $alert = new Alert();
        $alert->variant = 'totally-unknown';

        self::assertSame('alert', $alert->getAlertClasses());
    }

    public function test_custom_class_is_appended(): void
    {
        $alert = new Alert();
        $alert->class = 'mb-4';

        self::assertSame('alert mb-4', $alert->getAlertClasses());
    }
}
