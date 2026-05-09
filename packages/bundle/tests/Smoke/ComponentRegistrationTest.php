<?php

declare(strict_types=1);

namespace Twigcn\Bundle\Tests\Smoke;

use PHPUnit\Framework\Attributes\DataProvider;
use PHPUnit\Framework\TestCase;
use Psr\Container\ContainerInterface;
use ReflectionClass;
use Symfony\UX\TwigComponent\Attribute\AsTwigComponent;
use Symfony\UX\TwigComponent\ComponentFactory;
use Twig\Environment;
use Twigcn\Bundle\Tests\Fixtures\TestKernel;

final class ComponentRegistrationTest extends TestCase
{
    private const COMPONENT_DIR = __DIR__ . '/../../src/Twig/Components';
    private const COMPONENT_NAMESPACE = 'Twigcn\\Bundle\\Twig\\Components\\';

    /**
     * Components whose templates need explicit props or a parent context to render.
     * Skipping them in the render step keeps the smoke test honest about what it covers.
     *
     * @return list<string>
     */
    private static function renderSkipList(): array
    {
        return [];
    }

    private static function shouldSkipRender(string $expectedName): bool
    {
        return \in_array($expectedName, self::renderSkipList(), true);
    }

    private static ?TestKernel $kernel = null;

    public static function setUpBeforeClass(): void
    {
        self::$kernel = new TestKernel();
        self::$kernel->boot();
    }

    public static function tearDownAfterClass(): void
    {
        if (self::$kernel !== null) {
            self::$kernel->shutdown();
            self::$kernel = null;
        }
    }

    /**
     * @param class-string $fqcn
     */
    #[DataProvider('componentClassProvider')]
    public function test_component_can_be_created_and_rendered(string $fqcn, string $expectedName): void
    {
        $container = self::testContainer();

        $factory = $container->get('ux.twig_component.component_factory');
        self::assertInstanceOf(ComponentFactory::class, $factory);

        $mounted = $factory->create($expectedName, []);
        self::assertInstanceOf($fqcn, $mounted->getComponent(), sprintf(
            'Expected component "%s" to be registered as "%s".',
            $fqcn,
            $expectedName,
        ));

        if (self::shouldSkipRender($expectedName)) {
            self::markTestIncomplete(sprintf('%s render skipped (requires explicit props or parent context)', $expectedName));
        }

        $twig = $container->get('twig');
        self::assertInstanceOf(Environment::class, $twig);

        $rendered = $twig->createTemplate(sprintf('<twig:%s />', $expectedName))->render();

        self::assertNotSame('', trim($rendered), sprintf('Render of <twig:%s /> produced empty output.', $expectedName));
    }

    private static function testContainer(): ContainerInterface
    {
        $kernel = self::$kernel;
        self::assertNotNull($kernel, 'TestKernel was not booted in setUpBeforeClass.');

        $container = $kernel->getContainer()->get('test.service_container');
        self::assertInstanceOf(ContainerInterface::class, $container);

        return $container;
    }

    /**
     * @return iterable<string, array{0: class-string, 1: string}>
     */
    public static function componentClassProvider(): iterable
    {
        $files = glob(self::COMPONENT_DIR . '/*.php') ?: [];
        sort($files);

        foreach ($files as $file) {
            $shortName = basename($file, '.php');
            $fqcn = self::COMPONENT_NAMESPACE . $shortName;

            if (!class_exists($fqcn)) {
                continue;
            }

            $expectedName = self::resolveTwigComponentName($fqcn, $shortName);

            yield $expectedName => [$fqcn, $expectedName];
        }
    }

    /**
     * @param class-string $fqcn
     */
    private static function resolveTwigComponentName(string $fqcn, string $shortName): string
    {
        $reflection = new ReflectionClass($fqcn);
        $attributes = $reflection->getAttributes(AsTwigComponent::class);

        if ($attributes !== []) {
            $config = $attributes[0]->newInstance()->serviceConfig();
            $explicit = $config['key'] ?? null;
            if (\is_string($explicit) && $explicit !== '') {
                return $explicit;
            }
        }

        // Bundle config sets name_prefix=Twigcn, applied only when the name is
        // derived from the class name.
        return 'Twigcn:' . $shortName;
    }
}
