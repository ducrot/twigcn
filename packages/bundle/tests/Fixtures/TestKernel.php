<?php

declare(strict_types=1);

namespace Twigcn\Bundle\Tests\Fixtures;

use Symfony\Bundle\FrameworkBundle\FrameworkBundle;
use Symfony\Bundle\TwigBundle\TwigBundle;
use Symfony\Component\Config\Loader\LoaderInterface;
use Symfony\Component\DependencyInjection\ContainerBuilder;
use Symfony\Component\HttpKernel\Kernel;
use Symfony\UX\Icons\UXIconsBundle;
use Symfony\UX\TwigComponent\TwigComponentBundle;
use Twigcn\Bundle\TwigcnBundle;

final class TestKernel extends Kernel
{
    public function __construct(string $environment = 'test', bool $debug = true)
    {
        parent::__construct($environment, $debug);
    }

    public function registerBundles(): iterable
    {
        return [
            new FrameworkBundle(),
            new TwigBundle(),
            new TwigComponentBundle(),
            new UXIconsBundle(),
            new TwigcnBundle(),
        ];
    }

    public function registerContainerConfiguration(LoaderInterface $loader): void
    {
        $loader->load(static function (ContainerBuilder $container): void {
            $container->loadFromExtension('framework', [
                'test' => true,
                'secret' => 'test',
                'http_method_override' => false,
                'handle_all_throwables' => true,
                'php_errors' => ['log' => true],
            ]);

            $container->loadFromExtension('twig', [
                'default_path' => __DIR__ . '/templates',
                'strict_variables' => true,
            ]);

            // Avoid network-dependent Iconify lookups for icons referenced by
            // bundle templates (lucide:*). Renders an empty <svg> instead.
            $container->loadFromExtension('ux_icons', [
                'ignore_not_found' => true,
            ]);

            $container->setParameter('kernel.secret', 'test');
        });
    }

    public function getCacheDir(): string
    {
        return sys_get_temp_dir() . '/twigcn-bundle-tests/' . spl_object_hash($this) . '/cache';
    }

    public function getLogDir(): string
    {
        return sys_get_temp_dir() . '/twigcn-bundle-tests/' . spl_object_hash($this) . '/log';
    }
}
