<?php declare(strict_types=1);

namespace Crate\Backend\View;

use Twig\Environment;

class View
{

    /**
     * TWIG Environment
     *
     * @var Environment
     */
    protected Environment $twig;

    public function __construct(TemplateLoader $loader)
    {
        $this->twig = new Environment($loader);
    }

    public function render(string $template, array $context = []): string
    {
        return $this->twig->render($template, $context);
    }

}
