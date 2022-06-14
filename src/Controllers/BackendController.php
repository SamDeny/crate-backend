<?php declare(strict_types=1);

namespace Crate\Backend\Controllers;

use Citrus\Http\Request;
use Citrus\Http\Response;
use Crate\Backend\View\View;

class BackendController
{

    public function __construct(View $view)
    {
        $this->view = $view;
    }

    public function index(Request $request)
    {
        $response = new Response();

        return $response->setHTML(
            $this->view->render('index')
        );
    }

}
