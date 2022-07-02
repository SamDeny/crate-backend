<?php declare(strict_types=1);

namespace Crate\Backend\Api;

use Citrus\Contracts\SingletonContract;

class Administration implements SingletonContract
{

    /**
     * Registered Menus
     *
     * @var array
     */
    protected array $menus = [];

    /**
     * Create a new Administation class
     */
    public function __construct()
    {

    }

    /**
     * Get all registered menus
     *
     * @return array
     */
    public function getMenus(): array
    {
        return $this->sortMenus($this->menus);
    }

    /**
     * Get a specific menu
     *
     * @param string $group
     * @return array|null
     */
    public function getMenu(string $group): ?array
    {
        $group = strtolower($group);
        if (array_key_exists($group, $this->menus)) {
            return $this->sortMenus($this->menus)[$group];
        } else {
            return [];
        }
    }

    /**
     * Sort Menus
     *
     * @return array
     */
    protected function sortMenus(array $menus): array
    {
        //@todo
        return $menus;
    }

    /**
     * Register a new Administration Group
     *
     * @param string $id
     * @param string $label
     * @param array $config
     * @return boolean
     */
    public function registerGroup(string $id, string $label, array $config = []): bool
    {
        $id = strtolower($id);
        if (array_key_exists($id, $this->menus)) {
            //@todo log error
            return false;
        }

        // Register Menu Group
        $this->menus[$id] = [
            'label' => $label,
            'config' => $config,
            'pages' => []
        ];
        return true;
    }

    /**
     * Register a new Administration Page
     *
     * @param string $group
     * @param string $path
     * @param string $menuLabel
     * @param string $headTitle
     * @param array $config
     * @return boolean
     */
    public function registerPage(string $group, string $path, string $menuLabel, string $headTitle, array $config = []): bool
    {
        $group = strtolower($group);
        if (!array_key_exists($group, $this->menus)) {
            //@todo log error
            return false;
        }
        $menu = &$this->menus[$group]['pages'];

        // Check Page Path
        $path = strlen($path) > 1? rtrim($path, '/'): $path;
        if ($path[0] !== '/') {
            $path = '/' . $path;
        }
        if (array_key_exists($path, $menu)) {
            //@todo log error
            return false;
        }

        // Register Menu Page
        $menu[$path] = [
            'label' => $menuLabel,
            'title' => $headTitle,
            'config' => $config,
            'children' => []
        ];
        return true;
    }

    /**
     * Register a new Administration ChildPage
     *
     * @param string $parent
     * @param string $path
     * @param string $menuLabel
     * @param string $headTitle
     * @param array $config
     * @return boolean
     */
    public function registerChildPage(string $parent, string $path, string $menuLabel, string $headTitle, array $config = []): bool
    {
        if (($index = strpos($parent, '/')) === false) {
            //@todo log error
            return false;
        }

        // Check Menu Group
        $group = substr($parent, 0, $index);
        if (!array_key_exists($group, $this->menus)) {
            //@todo log error
            return false;
        }
        $menu = &$this->menus[$group]['pages'];

        // Check Parent Path
        $parents = explode('/', trim('/', substr($parent, $index)));
        $parent = array_shift($parents);
        if (!array_key_exists("/$parent", $menu)) {
            //@todo log error
            return false;
        }
        $menu = &$menu["/$parent"]['children'];

        // Travel to Children
        if (count($parents) > 0) {
            while (count($parents) > 0) {
                $page = array_shift($parents);
                if (!array_key_exists("/$page", $menu)) {
                    return false;
                }
                $menu = &$menu["/$page"]['children'];
            }
        }

        // Check Page Path
        $path = rtrim($path, '/');
        if ($path[0] !== '/') {
            $path = '/' . $path;
        }
        if (array_key_exists($path, $menu)) {
            //@todo log error
            return false;
        }

        // Register Menu SubPage
        $menu[$path] = [
            'label' => $menuLabel,
            'title' => $headTitle,
            'config' => $config,
            'children' => []
        ];
        return true;
    }

}
