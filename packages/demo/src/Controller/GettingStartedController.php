<?php

declare(strict_types=1);

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/getting-started', name: 'app_getting_started')]
final class GettingStartedController extends AbstractController
{
    public function __invoke(): Response
    {
        return $this->render('getting-started/index.html.twig');
    }
}
