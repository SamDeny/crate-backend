<?php declare(strict_types=1);

use Crate\Core\Modules\Module;

/**
 * Registry Module
 * ---
 */
module(function (Module $module) {


    $module->routes('routes.php');

    $module->runtime(\Crate\Backend\Module::class);
    
});
