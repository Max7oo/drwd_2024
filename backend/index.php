<?php
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Server\RequestHandlerInterface;

use Slim\Factory\AppFactory;

require __DIR__ . '/vendor/autoload.php';

$app = AppFactory::create();
$app->setBasePath('/drwd_2024/api');

// Add error middleware
$app->addErrorMiddleware(true, true, true);

// Parse JSON, form data, and XML
$app->addBodyParsingMiddleware();

$app->options('/{routes:.+}', function ($request, $response, $args) {
    return $response;
});

$app->add(function ($request, $handler) {
    $response = $handler->handle($request);
    return $response
            ->withHeader('Access-Control-Allow-Origin', '*')
            ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
            ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
});

$app->get('/', function (Request $request, Response $response) {
    $response->getBody()->write("Hello world!");

    return $response;
});

$app->post('/submit_form', function (Request $request, Response $response) {
    $data = $request->getParsedBody();

    // Get form data
    $name = $data['name'] ?? '';
    $email = $data['email'] ?? '';
    $subject = $data['subject'] ?? '';
    $message = $data['message'] ?? '';

    // Example: send an email
    $to = "info@drwd.nl";
    $body = "Naam: $name\nEmail: $email\nOnderwerp: $subject\nBericht: $message";

    $response->withHeader('Access-Control-Allow-Origin', '*')
    ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
    ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');

    if (mail($to, $subject, $body)) {
        $response->getBody()->write("Email sent successfully");
    } else {
        $response->getBody()->write("Failed to send email");
    }

    return $response;
});

$app->run();
