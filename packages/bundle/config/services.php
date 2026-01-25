<?php

declare(strict_types=1);

namespace Symfony\Component\DependencyInjection\Loader\Configurator;

use Symfony\UX\TwigComponent\Attribute\AsTwigComponent;

return static function (ContainerConfigurator $container): void {
    $services = $container->services()
        ->defaults()
        ->autowire()
        ->autoconfigure();

    // Auto-register all Twig components
    $services->load('Twigcn\\Bundle\\Twig\\Components\\', '../src/Twig/Components/');
};
