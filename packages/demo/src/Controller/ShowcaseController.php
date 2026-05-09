<?php

declare(strict_types=1);

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/showcase')]
final class ShowcaseController extends AbstractController
{
    public const array COMPONENTS = [
        'form' => [
            'button' => 'Button',
            'checkbox' => 'Checkbox',
            'choice-card' => 'Choice Card',
            'combobox' => 'Combobox',
            'field' => 'Field',
            'input' => 'Input',
            'input-group' => 'Input Group',
            'label' => 'Label',
            'radio-group' => 'Radio Group',
            'select' => 'Select',
            'switch' => 'Switch',
            'textarea' => 'Textarea',
        ],
        'layout' => [
            'accordion' => 'Accordion',
            'breadcrumb' => 'Breadcrumb',
            'button-group' => 'Button Group',
            'card' => 'Card',
            'pagination' => 'Pagination',
            'sidebar' => 'Sidebar',
            'table' => 'Table',
            'tabs' => 'Tabs',
        ],
        'overlay' => [
            'alert-dialog' => 'Alert Dialog',
            'command' => 'Command',
            'dialog' => 'Dialog',
            'drawer' => 'Drawer',
            'dropdown-menu' => 'Dropdown Menu',
            'popover' => 'Popover',
            'tooltip' => 'Tooltip',
        ],
        'feedback' => [
            'alert' => 'Alert',
            'avatar' => 'Avatar',
            'badge' => 'Badge',
            'carousel' => 'Carousel',
            'empty' => 'Empty',
            'item' => 'Item',
            'kbd' => 'Kbd',
            'progress' => 'Progress',
            'skeleton' => 'Skeleton',
            'spinner' => 'Spinner',
            'theme-switcher' => 'Theme Switcher',
            'toast' => 'Toast',
        ],
    ];

    #[Route('', name: 'showcase_index')]
    public function index(): Response
    {
        return $this->render('showcase/index.html.twig', [
            'components' => self::COMPONENTS,
            'componentsAlphabetical' => $this->getAlphabeticalComponents(),
        ]);
    }

    private function getAlphabeticalComponents(): array
    {
        $all = [];
        foreach (self::COMPONENTS as $items) {
            foreach ($items as $slug => $name) {
                $all[$slug] = $name;
            }
        }
        asort($all);

        return $all;
    }

    #[Route('/{slug}', name: 'showcase_component')]
    public function component(string $slug): Response
    {
        return $this->render("showcase/components/{$slug}.html.twig", [
            'components' => self::COMPONENTS,
            'componentsAlphabetical' => $this->getAlphabeticalComponents(),
            'current' => $slug,
        ]);
    }
}
