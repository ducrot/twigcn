<?php

declare(strict_types=1);

namespace Twigcn\Bundle\DependencyInjection;

use Symfony\Component\Config\FileLocator;
use Symfony\Component\DependencyInjection\ContainerBuilder;
use Symfony\Component\DependencyInjection\Extension\Extension;
use Symfony\Component\DependencyInjection\Extension\PrependExtensionInterface;
use Symfony\Component\DependencyInjection\Loader\PhpFileLoader;

final class TwigcnExtension extends Extension implements PrependExtensionInterface
{
    public function load(array $configs, ContainerBuilder $container): void
    {
        $loader = new PhpFileLoader($container, new FileLocator(\dirname(__DIR__, 2) . '/config'));
        $loader->load('services.php');
    }

    public function prepend(ContainerBuilder $container): void
    {
        // Register Twig namespace for bundle templates
        $container->prependExtensionConfig('twig', [
            'paths' => [
                \dirname(__DIR__, 2) . '/templates' => 'Twigcn',
            ],
        ]);

        // Configure twig_component to auto-discover components
        $container->prependExtensionConfig('twig_component', [
            'defaults' => [
                'Twigcn\\Bundle\\Twig\\Components\\' => [
                    'template_directory' => '@Twigcn/components/',
                    'name_prefix' => 'Twigcn',
                ],
            ],
        ]);
    }
}
