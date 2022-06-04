<?php declare(strict_types=1);

use Crate\Classes\ModuleRegistry;

/**
 * Registry Module
 * ---
 * First of all, our module should introduce itself to Crate, for that we use 
 * Citrus, the main Application Framework behind Crate. The main citrus function 
 * allows us to pass a Closure with the respective introduction code.
 */
citrus(function (ModuleRegistry $registry) {

    // Since our module has a composer.json file, we don't need to say much 
    // more. However, if your module does not contain a composer.json file, 
    // just pass an array as second argument (see docs for more infos).
    $module = $registry->register('@crate/backend');


    // This module has some other dependencies, which Crate should know about.
    $module->dependencies([
        '@crate/templating' => '^0.1.0',        // Templating Environment
        '@rat/rat'          => '^0.1.0',        // Rat Templating Engine
    ]);

    $module->optionalDependencies([
        '@rat/rpmd'         => '^0.1.0'         // Rat Poisoned Markdown
    ]);


    // This module also supports the node.js environment of Crate, so we need 
    // to tell Crate about this. Keep in mind, that node.js is an optional 
    // dependency for Crate, Crate users should still be possible working with 
    // your extension even without relying on node.js!
    $module->supports('node-js');


    // This module provides some configuration files in the ./config folder.
    // Crate should know about them as well, so Crate users are able to 
    // configure your extension without touching your source files.
    // PS.: You can use YAML, JSON, INI or PHP for your configuration files. 
    $module->configurable('config/backend.php', 'backend');


    // During development, it may is a good idea to disable the whole caching 
    // for this module, at least in a non-production environment. Thus, we
    // check the environment and current state of our module (the state is 
    // evaluated of the provided data / composer.json details).
    if (!citrus()->isProduction() && !$module->isStable()) {
        $module->disableCache();
    }


    // Now we need to tell Crate about the routes, which are provided by our 
    // fancy module, if any. Keep in mind, that routes will be cached as well,
    // unless you disable the cache as shown above. You can either pass a 
    // Closure function or, like below, a filepath which contains all routes.
    $module->routes('routes.php');

});


// EOF HINT:
// The data provided / registered in the module.php file will be cached, thus
// you should NEVER include functions or commands, which must be executed on 
// each request circle. This file is just to share / register some details.
