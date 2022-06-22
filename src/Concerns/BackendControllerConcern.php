<?php declare(strict_types=1);

namespace Crate\Backend\Concerns;

use Citrus\Http\Request;
use Citrus\Router\Route;
use Crate\Core\Contracts\ControllerContract;
use Crate\View\Assets;
use Crate\View\View;
use Twig\Markup;
use Twig\TwigFunction;

abstract class BackendControllerConcern implements ControllerContract
{

    /**
     * @var Assets
     */
    protected Assets $assets;

    /**
     * @var View
     */
    protected View $view;

    /**
     * Cached Icon Data
     *
     * @var array
     */
    protected array $cachedIcons = [];

    /**
     * Crate a new Backend Controller
     *
     * @param Assets $assets
     * @param View $view
     */
    public function __construct(Assets $assets, View $view, Request $request, Route $route)
    {
        $this->assets = $assets;
        $this->view = $view;

        $this->view->getTwigEnvironment()->addFunction(
            new TwigFunction('icon', [$this, 'getIcon'])
        );

        $this->view->getTwigEnvironment()->addFunction(
            new TwigFunction('csrf', [$this, 'getCsrfToken'])
        );
    }

    /**
     * Get Icon Content
     *
     * @param string $iconPath
     * @param integer $size
     * @return string|Markup
     */
    public function getIcon(string $icon, int $size = 16): string | Markup
    {
        if (strpos($icon, '.svg') !== strlen($icon) - 4) {
            $icon .= '.svg';
        }

        // Get Cached Icons
        if (array_key_exists($icon, $this->cachedIcons)) {
            $data = $this->cachedIcons[$icon];
        } else {
            $iconPath = path(':modules/@crate/backend/public/icons/', $icon);
    
            if (!file_exists($iconPath)) {
                return 'icon "' . $icon . '" does not exist.';
            }

            $data = file_get_contents($iconPath);
            $this->cachedIcons[$icon] = $data;
        }

        // Change Icon Size
        if ($size !== 16) {
            $data = str_replace(['width="16"', 'height="16"'], ['width="' . $size . '"', 'height="' . $size . '"'], $data);
        }
        return new Markup($data, 'utf-8');
    }

    /**
     * Get CSRF Token
     *
     * @return string
     */
    public function getCsrfToken(): string
    {
        return '';
    }

}
