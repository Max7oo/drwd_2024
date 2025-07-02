<?php
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Server\RequestHandlerInterface;
use Symfony\Component\Mailer\Transport;
use Symfony\Component\Mailer\Mailer;
use Symfony\Component\Mime\Email;
use GuzzleHttp\Client;
use Slim\Exception\HttpNotFoundException;
use Slim\Exception\HttpMethodNotAllowedException;

use Slim\Factory\AppFactory;

require __DIR__ . '/vendor/autoload.php';
// ini_set('display_errors', 1);
// ini_set('display_startup_errors', 1);
// error_reporting(E_ALL);
$app = AppFactory::create();
// $app->setBasePath('/api');
$app->setBasePath('/drwd_2024/api');

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

$app->addRoutingMiddleware();

// Add error middleware
$errorMiddleware = $app->addErrorMiddleware(true, true, true);

// Parse JSON, form data, and XML
$app->addBodyParsingMiddleware();

$errorMiddleware->setDefaultErrorHandler(function (
    Request $request,
    Throwable $exception,
    bool $displayErrorDetails,
    bool $logErrors,
    bool $logErrorDetails
) use ($app): Response {
    $response = $app->getResponseFactory()->createResponse();

    if ($exception instanceof HttpNotFoundException) {
        $response->getBody()->write("<h1>404 Not Found</h1><p>The requested page could not be found.</p>");
        return $response->withHeader('Content-Type', 'text/html')->withStatus(404);
    }

    if ($exception instanceof HttpMethodNotAllowedException) {
        $allowed = implode(', ', $exception->getAllowedMethods());
        $response->getBody()->write("<h1>405 Method Not Allowed</h1><p>Allowed methods: $allowed</p>");
        return $response->withHeader('Content-Type', 'text/html')->withStatus(405);
    }

    // Generic error fallback
    $response->getBody()->write("<h1>500 Internal Server Error</h1><p>An unexpected error occurred.</p>");
    return $response->withHeader('Content-Type', 'text/html')->withStatus(500);
});

$app->add(function (Request $request, RequestHandlerInterface $handler) use ($app): Response {
    if ($request->getMethod() === 'OPTIONS') {
        $response = $app->getResponseFactory()->createResponse();
    } else {
        $response = $handler->handle($request);
    }
    
    if (ob_get_contents()) {
        ob_clean();
    }

    return $response;  
});

$app->post('/submit_form', function (Request $request, Response $response) {
    $data       = $request->getParsedBody();
    $transport  = Transport::fromDsn($_ENV['MAILER_DSN']);
    $mailer     = new Mailer($transport);

    // Get form data
    $name       = $data['name'] ?? '';
    $email      = $data['email'] ?? '';
    $subject    = $data['subject'] ?? '';
    $message    = $data['message'] ?? '';
    $body       = "Naam: $name\nEmail: $email\nOnderwerp: $subject\nBericht: $message";

    $recaptchaToken = $data['recaptchaToken'];

    if (!$recaptchaToken || !isValidCaptcha($recaptchaToken)) {
        $response->getBody()->write("Invalid recaptcha");
        return $response;
    } else {
        //It's important not to use the submitter's address as the from address as it's forgery,
        //which will cause your messages to fail SPF checks.
        //Use an address in your own domain as the from address, put the submitter's address in a reply-to

        $email = (new Email())
            ->from($_ENV['MAIL_FROM'])
            ->to($_ENV['MAIL_TO'])
            ->subject('Contactformulier: ' . $subject)
            ->text($body);

        $mailer->send($email);
    }

    return $response;
});

/**
     * Validate the recaptcha token with Google
     */
    function isValidCaptcha($token)
    {
        $client = new Client([
            // Base URI is used with relative requests
            'base_uri' => 'https://www.google.com'
        ]);

        $data = [
            'secret'    => $_ENV['RECAPTCHA_SECRET'],
            'response'  => $token
        ];

        $response = $client->request('POST', '/recaptcha/api/siteverify', [
            'form_params' => $data
            ]
        );

        $body = json_decode($response->getBody()->getContents(), true);
        
        return $body['success'];
    }

$app->run();
