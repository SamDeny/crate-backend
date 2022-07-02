<?php declare(strict_types=1);

namespace Crate\Backend\Controllers;

use Citrus\Http\Request;
use Citrus\Http\Response;
use Crate\Backend\Concerns\BackendControllerConcern;

class CollectionsController extends BackendControllerConcern
{

    /**
     * Index Page
     *
     * @param Request $request
     * @return void
     */
    public function index(Request $request)
    {
        $response = new Response();

        return $response->setHTML(
            $this->view->render('collections/list', [
                'dev' => microtime(true) - citrus()->getStartTime(),
                'error' => '',
                'username' => '',
            ])
        );
    }

    public function create(Request $request)
    {
        $response = new Response();

        return $response->setHTML(
            $this->view->render('collections/create', [
                'dev' => microtime(true) - citrus()->getStartTime(),
                'error' => '',
                'username' => '',
            ])
        );
    }

    public function update(Request $request, string $uuid)
    {
        $response = new Response();

        return $response->setHTML(
            $this->view->render('collections/update', [
                'dev' => microtime(true) - citrus()->getStartTime(),
                'error' => '',
                'username' => '',
            ])
        );
    }

}
