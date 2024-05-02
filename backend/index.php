<?php
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;

require __DIR__ . '/vendor/autoload.php';

$app = AppFactory::create();
$app->setBasePath('/api');

// Add error middleware
$app->addErrorMiddleware(true, true, true);

// Parse JSON, form data, and XML
$app->addBodyParsingMiddleware();

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

    if (mail($to, $subject, $body)) {
        $response->getBody()->write("Email sent successfully");
    } else {
        $response->getBody()->write("Failed to send email");
    }

    return $response;
});

$app->run();
