<?php declare(strict_types=1);

use Crate\Http\RouteCollector;

/** @var RouteCollector */
$collector = $collector;

/**
 * Registry Routes
 * ---
 * This file contains all available routes. Keep in mind, that this file will 
 * be cached, so don't execute any action or dynamically created routes (use 
 * route patterns for such purposes).
 */
$collector->group([
    'api' => false,                     // Requests are not available via Crate's API handling
    'cli' => false,                     // Requests are not available through Crate's CLI
    'url' => config('backend.url')      // Routes belong explicitly to this URL
], function(RouteCollector $collector) {

    // Simple get request method
    $collector->get('/', BackendController::class);

    // The form method registers appropriate routes
    $collector->form('/login', LoginController::class);
    $collector->form('/forgot', LoginController::class);
    $collector->form('/remember', LoginController::class);
    $collector->form('/activate', LoginController::class);

    // Another simple get request method
    $collector->get('/logout', LoginController::class);

    // Start another group with more shared properties
    $collector->group([
        'middleware' => [AuthenticationMiddleware::class],
        'middlewareOptions' => [
            AuthenticationMiddleware::class => [
                'redirect' => '/login'
            ]
        ]
    ], function (RouteCollector $collector) {
        
        // Simple get request method, but for XHR / Ajax requests only.
        $collector->get('/auth', AuthController::class)->ajax();
        $collector->get('/token', TokenController::class)->ajax();

        // Simple get request method, for ajax only using a dynamic route mapping
        $collector->get('/refresh/:uuid', TokenController::class)->ajax();
    
        // The ctrl method binds a whole controller to a path
        $collector->ctrl('/system', SystemController::class);
        $collector->ctrl('/users', SystemController::class);
    
        // Register additional controllers, which are controlled by parameters.
        // With parameters you can control when a route should be enabled and 
        // executed, before the controller is even initialized.
        $collector->ctrl('/collection', CollectionsController::class)->param(
            ModuleEnabledRouteParam::class, ['@crate/collections']
        );
        $collector->ctrl('/channel', CollectionsController::class)->param(
            ModuleEnabledRouteParam::class, ['@crate/channels']
        );
        $collector->ctrl('/form', CollectionsController::class)->param(
            ModuleEnabledRouteParam::class, ['@crate/forms']
        );
        $collector->ctrl('/singleton', CollectionsController::class)->param(
            ModuleEnabledRouteParam::class, ['@crate/singletons']
        );
        $collector->ctrl('/frontend', FrontendController::class)->param(
            ModuleEnabledRouteParam::class, ['@crate/frontend']
        );
        
    });

    // Register some error pages
    $collector->error(400, [HTTPErrorController::class, 'e400']);       // Bad Request
    $collector->error(401, [HTTPErrorController::class, 'e401']);       // Unauthorized
    $collector->error(403, [HTTPErrorController::class, 'e403']);       // Forbidden
    $collector->error(404, [HTTPErrorController::class, 'e404']);       // Not Found
    $collector->error(405, [HTTPErrorController::class, 'e405']);       // Method not allowed
    $collector->error(409, [HTTPErrorController::class, 'e409']);       // Conflict
    $collector->error(410, [HTTPErrorController::class, 'e410']);       // Gone
});


// EOF HINT:
// The Citrus HTTP request router supports a few dynamic route pattern, check 
// out the documentation for more information.
