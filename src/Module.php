<?php declare(strict_types=1);

namespace Crate\Backend;

use Crate\Backend\Api\Administration;
use Crate\Core\Modules\ModuleRegistry;
use Crate\Core\Translator\Translator;

class Module 
{

    /**
     * @var Administration
     */
    protected Administration $admin;

    /**
     * @var Translator
     */
    protected Translator $translator;

    /**
     * @var ModuleRegistry
     */
    protected ModuleRegistry $registry;

    /**
     * Create a new Module instance
     *
     * @param Administration $admin
     */
    public function __construct(Administration $admin, Translator $translator, ModuleRegistry $registry)
    {
        $this->admin = $admin;
        $this->translator = $translator;
        $this->registry = $registry;
    }

    /**
     * Translator Helper
     *
     * @param string $key
     * @param string $default
     * @return string
     */
    private function __(string $key, string $default = ''): string
    {
        return $this->translator->trans("@crate/backend:$key", $default);
    }

    /**
     * Bootstrap Module
     *
     * @return void
     */
    public function bootstrap()
    {

        // Register Core Group
        $this->admin->registerGroup('core', $this->__('admin:group-core', 'Home'), [ 
            'position'  => 0,
        ]);
        $this->admin->registerPage(
            'core', 
            '/', 
            $this->__('admin:dashboard-label', 'Dashboard'), 
            $this->__('admin:dashboard-title', 'Dashboard'), 
            [
                'icon' => 'speedometer'
            ]
        );
        $this->admin->registerPage(
            'core',
            '/about',
            $this->__('admin:about-label', 'About'), 
            $this->__('admin:about-title', 'About Crate'), 
            [
                'icon' => 'info-circle'
            ]
        );

        // Register Manage Group
        $this->admin->registerGroup('manage', $this->__('admin:group-manage', 'Manage'), [ 
            'position'  => 20,
            'class'     => 'item-emerald'
        ]);
        $this->admin->registerPage(
            'manage', 
            '/collections', 
            $this->__('admin:collection-label', 'Collections'),
            $this->__('admin:collection-title', 'Manage Collections'),
            [ 
                'icon' => 'collection',
                'class' => $this->registry->isEnabled('@crate/collections')? '': 'gray'
            ]
        );
        $this->admin->registerPage(
            'manage', 
            '/singletons', 
            $this->__('admin:singleton-label', 'Singletons'),
            $this->__('admin:singleton-title', 'Manage Singletons'),
            [ 
                'icon' => 'files-alt',
                'class' => $this->registry->isEnabled('@crate/singletons')? '': 'gray'
            ]
        );
        $this->admin->registerPage(
            'manage', 
            '/forms', 
            $this->__('admin:form-label', 'Forms'),
            $this->__('admin:form-title', 'Manage Forms'),
            [ 
                'icon' => 'input-cursor',
                'class' => $this->registry->isEnabled('@crate/forms')? '': 'gray'
            ]
        );
        $this->admin->registerPage(
            'manage', 
            '/taxonomies', 
            $this->__('admin:taxonomy-label', 'Taxonomies'),
            $this->__('admin:taxonomy-title', 'Manage Taxonomies'),
            [ 
                'icon' => 'tags',
                'class' => $this->registry->isEnabled('@crate/collections')? '': 'gray'
            ]
        );

        // Register Collection ChildPages
        if ($this->registry->isEnabled('@crate/collections')) {
            $this->admin->registerChildPage(
                'manage/collections',
                '/collections/new',
                $this->__('admin:new-collection-label', 'New Collection'),
                $this->__('admin:new-collection-title', 'Create new Collection'),
                [
                    'hide' => true
                ]
            );
            $this->admin->registerChildPage(
                'manage/collections',
                '/collections/edit',
                $this->__('admin:edit-collection-label', 'Edit Collection'),
                $this->__('admin:edit-collection-title', 'Edit Collection'),
                [
                    'hide' => true
                ]
            );
        }

        // Register Singletons ChildPages
        if ($this->registry->isEnabled('@crate/singletons')) {
            $this->admin->registerChildPage(
                'manage/singletons',
                '/singletons/new',
                $this->__('admin:new-singleton-label', 'New Singleton'),
                $this->__('admin:new-singleton-title', 'Create new Singleton'),
                [
                    'hide' => true
                ]
            );
            $this->admin->registerChildPage(
                'manage/singletons',
                '/singletons/edit',
                $this->__('admin:edit-singleton-label', 'Edit Singleton'),
                $this->__('admin:edit-singleton-title', 'Edit Singleton'),
                [
                    'hide' => true
                ]
            );
        }

        // Register System Group
        $this->admin->registerGroup('system', $this->__('admin:group-system', 'System'), [ 
            'position'  => 100,
            'class'     => 'item-red'
        ]);
        $this->admin->registerPage(
            'system',
            '/users', 
            $this->__('admin:user-label', 'Users'),
            $this->__('admin:user-title', 'Manage Users'),
            [ 
                'icon' => 'people'
            ]
        );
        $this->admin->registerPage(
            'system',
            '/plugins', 
            $this->__('admin:plugins-label', 'Plugins'),
            $this->__('admin:plugins-title', 'Manage Plugins'),
            [ 
                'icon' => 'plugin'
            ]
        );
        $this->admin->registerPage(
            'system',
            '/themes', 
            $this->__('admin:themes-label', 'Themes'),
            $this->__('admin:themes-title', 'Manage Themes'),
            [ 
                'icon' => 'palette'
            ]
        );
        $this->admin->registerPage(
            'system',
            '/settings', 
            $this->__('admin:settings-label', 'Settings'),
            $this->__('admin:settings-title', 'Configure Crate'),
            [ 
                'icon' => 'wrench-adjustable-circle'
            ]
        );
    }

    /**
     * Process Plugin
     *
     * @return void
     */
    public function process()
    {
        //$this->registry->callHook('registerAdministration');
    }

}
