<?php
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Server\RequestHandlerInterface;
use Symfony\Component\Mailer\Transport;
use Symfony\Component\Mailer\Mailer;
use Symfony\Component\Mime\Email;
use GuzzleHttp\Client;


use Slim\Factory\AppFactory;

require __DIR__ . '/vendor/autoload.php';

$app = AppFactory::create();
$app->setBasePath('/drwd_2024/api');

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

// Add error middleware
$app->addErrorMiddleware(true, true, true);

// Parse JSON, form data, and XML
$app->addBodyParsingMiddleware();

$app->addRoutingMiddleware();

$app->options('/{routes:.+}', function ($request, $response, $args) {
    return $response;
});

$app->add(function (Request $request, RequestHandlerInterface $handler) use ($app): Response {
    if ($request->getMethod() === 'OPTIONS') {
        $response = $app->getResponseFactory()->createResponse();
    } else {
        $response = $handler->handle($request);
    }

    //TODO disable in production
    $response = $response
        ->withHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5173')
        ->withHeader('Access-Control-Allow-Headers', '*')
        ->withHeader('Access-Control-Allow-Methods', '*');
    
    if (ob_get_contents()) {
        ob_clean();
    }

    return $response;  
});

$app->get('/', function (Request $request, Response $response) {
    $response->getBody()->write("Hello world!");
    $recaptchaToken = "asdfadsf";
    if (!$recaptchaToken || !isValidCaptcha($recaptchaToken)) {
        $response->getBody()->write("Invalid recaptcha");
    } else {
        $response->getBody()->write("Boo boo");
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

    $recaptchaToken = $data['token'];

    if (!$recaptchaToken || !$this->isValidCaptcha($recaptchaToken)) {
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
            'response'  => "6LeSwCAcAAAAAFiJhDkF9i-3hlmHl_cUHDm4eB7N"//$token
        ];

        $response = $client->request('POST', '/recaptcha/api/siteverify', [
            'form_params' => $data
            ]
        );

        $body = json_decode($response->getBody()->getContents(), true);

        print_r($body);
        die();
        
        return $body['success'];
    }

$app->run();
