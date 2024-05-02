<?php
// Serve React frontend
if (preg_match('/\.(?:js|css|png|jpg|jpeg|gif|ico|json)$/', $_SERVER["REQUEST_URI"])) {
    return false; // Serve the requested file as-is
} else {
    // Serve index.html for any other requests
    require_once __DIR__ . '/index.html';
}
