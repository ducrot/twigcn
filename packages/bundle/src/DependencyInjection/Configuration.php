<?php

declare(strict_types=1);

namespace Twigcn\Bundle\DependencyInjection;

use Symfony\Component\Config\Definition\Builder\TreeBuilder;
use Symfony\Component\Config\Definition\ConfigurationInterface;

final class Configuration implements ConfigurationInterface
{
    public function getConfigTreeBuilder(): TreeBuilder
    {
        $treeBuilder = new TreeBuilder('twigcn');

        $treeBuilder->getRootNode();

        return $treeBuilder;
    }
}
