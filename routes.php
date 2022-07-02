<?php declare(strict_types=1);

use \Citrus\Router\Router;
use Crate\Backend\Controllers\CollectionsController;
use Crate\Backend\Controllers\DashboardController;

citrus(function(Router $router) {
    $router->group([
        'prefix' => '/system'
    ], function(Router $router) {
    
        // Simple get request method
        $router->get('/', [DashboardController::class, 'index']);

        $router->get('/collections', [CollectionsController::class, 'index']);
    
        // The form method registers appropriate routes
        $router->form('/login', LoginController::class);
        $router->form('/forgot', LoginController::class);
        $router->form('/remember', LoginController::class);
        $router->form('/activate', LoginController::class);
    
        // Another simple get request method
        $router->get('/logout', LoginController::class);
    
        // Start another group with more shared properties
        /*
        $router->group([
            'middleware' => [AuthenticationMiddleware::class],
            'middlewareOptions' => [
                AuthenticationMiddleware::class => [
                    'redirect' => '/login'
                ]
            ]
        ], function (Router $router) {
            
            // Simple get request method, but for XHR / Ajax requests only.
            $router->get('/auth', AuthController::class);
            $router->get('/token', TokenController::class);
    
            // Simple get request method, for ajax only using a dynamic route mapping
            $router->get('/refresh/:uuid', TokenController::class);
        
            // The ctrl method binds a whole controller to a path
            //$router->ctrl('/system', SystemController::class);
            //$router->ctrl('/users', SystemController::class);
        
            // Register additional controllers, which are controlled by parameters.
            // With parameters you can control when a route should be enabled and 
            // executed, before the controller is even initialized.
            //$router->ctrl('/collection', CollectionsController::class)->condition(
            //    ModuleEnabledRouteParam::class, ['@crate/collections']
            //);
            //$router->ctrl('/channel', CollectionsController::class)->condition(
            //    ModuleEnabledRouteParam::class, ['@crate/channels']
            //);
            //$router->ctrl('/form', CollectionsController::class)->condition(
            //    ModuleEnabledRouteParam::class, ['@crate/forms']
            //);
            //$router->ctrl('/singleton', CollectionsController::class)->condition(
            //    ModuleEnabledRouteParam::class, ['@crate/singletons']
            //);
            //$router->ctrl('/frontend', FrontendController::class)->condition(
            //    ModuleEnabledRouteParam::class, ['@crate/frontend']
            //);
            
        });
        */
    
        // Register some error pages
        $router->error(400, [HTTPErrorController::class, 'e400']);       // Bad Request
        $router->error(401, [HTTPErrorController::class, 'e401']);       // Unauthorized
        $router->error(403, [HTTPErrorController::class, 'e403']);       // Forbidden
        $router->error(404, [HTTPErrorController::class, 'e404']);       // Not Found
        $router->error(405, [HTTPErrorController::class, 'e405']);       // Method not allowed
        $router->error(409, [HTTPErrorController::class, 'e409']);       // Conflict
        $router->error(410, [HTTPErrorController::class, 'e410']);       // Gone
    });
});
